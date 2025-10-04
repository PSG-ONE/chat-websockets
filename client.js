// client.js
const WebSocket = require('ws');
const nacl = require('tweetnacl');
const util = require('tweetnacl-util');

const ROOM = process.argv[2] || 'sala-demo';
const NAME = process.argv[3] || 'anon';

const keyPair = nacl.box.keyPair();
let peerPubKey = null;
let ws;

function encode(o) { return JSON.stringify(o); }
function sendSignal(data) { ws.send(encode({ type: 'signal', data })); }

function encrypt(message) {
  const nonce = nacl.randomBytes(24);
  const boxed = nacl.box(util.decodeUTF8(message), nonce, peerPubKey, keyPair.secretKey);
  return { nonce: Buffer.from(nonce).toString('base64'), boxed: Buffer.from(boxed).toString('base64') };
}

function decrypt(payload) {
  const nonce = Buffer.from(payload.nonce, 'base64');
  const boxed = Buffer.from(payload.boxed, 'base64');
  const msg = nacl.box.open(boxed, nonce, peerPubKey, keyPair.secretKey);
  if (!msg) return null;
  return util.encodeUTF8(msg);
}

function startCLI() {
  process.stdin.setEncoding('utf8');
  process.stdout.write(`(${NAME}) escribe y Enter para enviar:\n`);
  process.stdin.on('data', (line) => {
    line = line.trim();
    if (!line) return;
    if (!peerPubKey) return console.log('Esperando al otro peer...');
    const payload = encrypt(JSON.stringify({ name: NAME, text: line, ts: Date.now() }));
    sendSignal({ kind: 'msg', payload });
  });
}

function main() {
  ws = new WebSocket('ws://localhost:8080');

  ws.on('open', () => {
    ws.send(encode({ type: 'join', room: ROOM }));
    const myPubB64 = Buffer.from(keyPair.publicKey).toString('base64');
    sendSignal({ kind: 'pubkey', pub: myPubB64, name: NAME });
  });

  ws.on('message', (raw) => {
    const msg = JSON.parse(raw);
    if (msg.type !== 'signal') return;

    const data = msg.data;

    if (data.kind === 'pubkey') {
      if (!peerPubKey) {
        peerPubKey = new Uint8Array(Buffer.from(data.pub, 'base64'));
        console.log(`↔️  Conectado con: ${data.name}`);
        const myPubB64 = Buffer.from(keyPair.publicKey).toString('base64');
        sendSignal({ kind: 'pubkey', pub: myPubB64, name: NAME });
        startCLI();
      }
    }

    if (data.kind === 'msg' && peerPubKey) {
      const plain = decrypt(data.payload);
      if (!plain) return console.log('⚠️  Mensaje no verificable');
      const { name, text } = JSON.parse(plain);
      console.log(`\n${name}: ${text}`);
      process.stdout.write('> ');
    }
  });
}

main();
