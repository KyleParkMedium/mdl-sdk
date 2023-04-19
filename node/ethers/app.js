import fs from "fs";
import { ethers } from "ethers";

let contract;

// Set RPC Endpoint
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");

async function api() {
  //   Get write access as an account by getting the signer
  const signer = await provider.getSigner(1);
  console.log(signer);

  const bn = await provider.getBlockNumber();
  console.log(bn);

  // Get the current balance of an account (by address or ENS name)
  const balanceWei = await provider.getBalance(signer);
  console.log(balanceWei);

  const balanceEth = ethers.formatEther(balanceWei);
  console.log(balanceEth);

  const txc = await provider.getTransactionCount(signer);
  console.log(txc);
}

// load smart contract
async function loadContract(wallet, contractName) {
  const contractAddress = fs.readFileSync(
    `./logs/${contractName}Address.txt`,
    function (err) {
      if (err) throw err;
    }
  );

  const jsonData = fs.readFileSync(
    `./artifacts/${contractName}.json`,
    "utf8",
    function (err) {
      if (err) throw err;
    }
  );
  const jsonArray = JSON.parse(jsonData);

  contract = new ethers.Contract(
    contractAddress.toString(),
    jsonArray.abi,
    wallet
  );
}

async function invokeContract() {
  const wallet = new ethers.Wallet(
    "0x6f2402e8bd8027b406775126e7a91ad2d33810bb97df5f96170b10fdc8ae86c3",
    provider
  );
  await loadContract(wallet, "Vault");

  const amount = ethers.parseEther("900000");
  const tx = await contract.setExample(amount);
  fs.writeFile(`./logs/VaultTest.json`, JSON.stringify(tx), function (err) {
    if (err) throw err;
    console.log("File is created successfully.");
  });

  const b = await contract.balanceOf(wallet.address);
  console.log(b);
}

async function invokeMint() {
  const wallet = new ethers.Wallet(
    "0xe331b0ca57f33194d1c43c8a2dcf5447d1e1dd8737e32d37f10256c71becf9c7",
    provider
  );
  await loadContract(wallet, "Mint");

  const amount = ethers.parseEther("10");
  try {
    const t = await contract._transfer(amount, { value: amount });
    await t.wait();
  } catch (error) {
    console.log("An error occurred:", error);
  }

  await loadContract(wallet, "Vault");
  // user balanceOf
  const b = await contract.balanceOf(wallet.address);
  console.log(`${wallet.address}'s balance : `, b);

  // vault contract balanceOf
  const vb = await contract.contractBalanceOf();
  console.log(`Vault Contract's balance : `, vb);
}

async function sendTx() {
  const wallet = new ethers.Wallet(
    "0xa26b1aaa44b2e450028b0ce8c982edc4acfebd258a6b87fc8c1ced35568204ec",
    provider
  );

  const hashedMessage = ethers.hashMessage("test");

  const tx = {
    to: "0x04dBBc8494794fA94874b013E37Cb809a64d9B70",
    value: ethers.parseEther("5.0"),
    gasLimit: 2100000, // 가스 한도
    gasPrice: ethers.parseUnits("100", "gwei"),
    nonce: await provider.getTransactionCount(wallet.address),
    data: hashedMessage,
  };

  const txHash = await wallet.sendTransaction(tx);
  console.log(JSON.stringify(txHash));
}

async function signMsg() {
  const wallet = new ethers.Wallet(
    "0x91ed17c2b38f0761653bacf31855b3e014724099a7f822bdadbe34925ca52051",
    provider
  );

  // hash message
  const hashedMessage = ethers.hashMessage("test");
  console.log("hashedMessage : ", hashedMessage);

  const sign = await wallet.signMessage("test");
  console.log("signMessage : ", sign);

  // r, s, v
  const r = sign.slice(0, 66);
  const s = `0x${sign.slice(66, 130)}`;
  const v = parseInt(sign.slice(130, 132), 16);

  await ecrecover(hashedMessage, v, r, s);
}

async function signTx() {
  const wallet = new ethers.Wallet(
    "0x91ed17c2b38f0761653bacf31855b3e014724099a7f822bdadbe34925ca52051",
    provider
  );

  // hash message
  const hashedData = ethers.hashMessage("test");
  console.log("hashedData : ", hashedData);

  const tx = {
    to: "0x26d3Ef03ca9dC1281b4eC716e818dAA850e4Be57",
    value: ethers.parseEther("5.0"),
    gasLimit: 21000,
    gasPrice: ethers.parseUnits("100", "gwei"),
    nonce: await provider.getTransactionCount(wallet.address),
    data: hashedData,
  };

  const signedTx = await wallet.signTransaction(tx);
  const tx_deserialized = ethers.Transaction.from(signedTx);

  // // unsignedHash = keccak256((unsignedSerialized = signedTx));
  // console.log(tx_deserialized.unsignedSerialized);
  // console.log(tx_deserialized.unsignedHash);

  const hash = tx_deserialized.unsignedHash;
  const v = tx_deserialized.signature.v;
  const r = tx_deserialized.signature.r;
  const s = tx_deserialized.signature.s;

  await ecrecover(hash, v, r, s);
}

async function ecrecover(message, v, r, s) {
  const wallet = new ethers.Wallet(
    "0xe331b0ca57f33194d1c43c8a2dcf5447d1e1dd8737e32d37f10256c71becf9c7",
    provider
  );
  await loadContract(wallet, "Validator");

  const address = await contract.recoverAddress(message, v, r, s);
  console.log("recover address : ", address);
  // console.log("addressByte : ", ethers.getBytes(address));
}

async function main() {
  invokeMint();
  invokeContract();
  sendTx();
  signMsg();
  signTx();
}

main();
