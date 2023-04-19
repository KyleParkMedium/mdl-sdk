import fs from "fs";
import path from "path";
import { ethers } from "hardhat";
import { BigNumber } from "@ethersproject/bignumber";

async function main() {
  const admin = "0xaD1a8D6ec690f7493140353979Cc1aa533AD52CD";

  const timeExample = BigNumber.from("0x7b");
  const timeString = timeExample.toString();

  const Vault = await ethers.getContractFactory("Vault");
  const vault = await Vault.deploy(admin, timeString);
  await vault.deployed();

  console.log(`deployed to ${vault.address}`);

  fs.writeFile(`./logs/VaultAddress.txt`, vault.address, function (err) {
    if (err) throw err;
    console.log("File is created successfully.");
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
