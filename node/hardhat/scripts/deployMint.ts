import fs from "fs";
import path from "path";
import { ethers } from "hardhat";
import { BigNumber } from "@ethersproject/bignumber";

async function main() {
  const vaultContractAddress = fs.readFileSync(`./logs/VaultAddress.txt`);

  const Mint = await ethers.getContractFactory("Mint");
  const mint = await Mint.deploy(
    vaultContractAddress.toString(),
    "0x26d3Ef03ca9dC1281b4eC716e818dAA850e4Be57",
    "name",
    "symbol",
    100000
  );
  await mint.deployed();

  console.log(`deployed to ${mint.address}`);

  fs.writeFile(`./logs/MintAddress.txt`, mint.address, function (err) {
    if (err) throw err;
    console.log("File is created successfully.");
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
