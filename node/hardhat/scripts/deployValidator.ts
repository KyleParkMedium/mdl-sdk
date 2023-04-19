import fs from "fs";
import path from "path";
import { ethers } from "hardhat";
import { BigNumber } from "@ethersproject/bignumber";

async function main() {
  const timeExample = BigNumber.from("0x7b");
  const timeString = timeExample.toString();

  const Validator = await ethers.getContractFactory("Validator");
  const validator = await Validator.deploy();
  await validator.deployed();

  console.log(`deployed to ${validator.address}`);

  fs.writeFile(
    `./logs/ValidatorAddress.txt`,
    validator.address,
    function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    }
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
