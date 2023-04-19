import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "@ethersproject/bignumber";

describe("Test ECDSA", function () {
  async function init() {
    const [adminMint, adminVault, middleMan] = await ethers.getSigners();
    return [adminMint, adminVault, middleMan];
  }

  async function deployValidator() {
    const [adminMint, adminVault, middleMan] = await loadFixture(init);
    const ValidatorContract = await ethers.getContractFactory("ECDSAExample");

    const validator = await ValidatorContract.deploy({});
    await validator.deployed();

    return { validator };
  }

  it("should set contract address", async function () {
    describe("Deploy Vault", function () {
      it("should set contract address", async function () {
        const [adminMint, adminVault, middleMan] = await loadFixture(init);
        const { validator } = await loadFixture(deployValidator);

        const { randomBytes } = await import("node:crypto");

        const buf1 = randomBytes(32).toString("hex");
        const bytes1 = `0x${buf1}`;
        const buf2 = randomBytes(32).toString("hex");
        const bytes2 = `0x${buf2}`;
        const buf3 = randomBytes(32).toString("hex");
        const bytes3 = `0x${buf3}`;

        const getAddress = await validator.recoverAddress(
          bytes1,
          27,
          bytes2,
          bytes3
        );

        console.log(getAddress);
        // expect(getAddress).to.equal(adminMint.address);
      });
    });
  });
});
