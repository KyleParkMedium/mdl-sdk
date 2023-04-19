const etherWallet = require("ethereumjs-wallet").default;
const Web3 = require("web3");
const web3 = new Web3();

var wallet1 = etherWallet.fromPrivateKey(
  Buffer.from(
    "cc44f51a3935aa1d5c2f7b1cfc2b3d4903e57402413d1cb506a35a264bb8009f",
    "Hex"
  )
);

console.log("address1: " + wallet1.getAddressString());
console.log(web3.utils.hexToBytes(wallet1.getAddressString()).length);
console.log("private key1: " + wallet1.getPrivateKeyString());
console.log(web3.utils.hexToBytes(wallet1.getPrivateKeyString()).length);
console.log("public key1: " + wallet1.getPublicKeyString());
console.log(web3.utils.hexToBytes(wallet1.getPublicKeyString()).length);
console.log("");

const messagetoSign = web3.utils.keccak256("message");
const signatureData = web3.eth.accounts.sign(
  messagetoSign,
  wallet1.getPrivateKeyString()
);

const signature = signatureData.signature;
const v = signatureData.v;
const r = signatureData.r;
const s = signatureData.s;
console.log("messagetoSign: " + messagetoSign);
console.log(web3.utils.hexToBytes(messagetoSign).length);
console.log("signature: " + signature);
console.log(web3.utils.hexToBytes(signature).length);
console.log("v: " + v);
console.log(web3.utils.hexToBytes(v).length);
console.log("r: " + r);
console.log(web3.utils.hexToBytes(r).length);
console.log("s: " + s);
console.log(web3.utils.hexToBytes(s).length);
console.log("");
console.log(signatureData);
