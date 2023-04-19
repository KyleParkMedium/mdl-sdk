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
    const ValidatorContract = await ethers.getContractFactory("Validator");

    const validator = await ValidatorContract.deploy({});
    await validator.deployed();

    return { validator };
  }

  describe("Run ecrecover", function () {
    it("should get address signed message", async function () {
      const [adminMint] = await loadFixture(init);
      const { validator } = await loadFixture(deployValidator);

      const hashedMessage = ethers.utils.hashMessage("test");
      const sign = await adminMint.signMessage("test");

      const r = sign.slice(0, 66);
      const s = `0x${sign.slice(66, 130)}`;
      const v = parseInt(sign.slice(130, 132), 16);

      const getAddress = await validator.recoverAddress(hashedMessage, v, r, s);

      expect(getAddress).to.equal(adminMint.address);
    });

    it("should get address signed transaction", async function () {
      const { validator } = await loadFixture(deployValidator);

      const wallet = ethers.Wallet.createRandom();

      const hashedData = ethers.utils.hashMessage("test");
      const tx = {
        to: "0x26d3Ef03ca9dC1281b4eC716e818dAA850e4Be57",
        value: ethers.utils.parseEther("5.0"),
        gasLimit: 21000,
        gasPrice: ethers.utils.parseUnits("100", "gwei"),
        data: hashedData,
      };

      const signedTx = await wallet.signTransaction(tx);
      const parsedTx = ethers.utils.parseTransaction(signedTx);

      const sT = ethers.utils.serializeTransaction(tx);
      const hashedST = ethers.utils.keccak256(sT);

      const v = parsedTx.v;
      const r = parsedTx.r;
      const s = parsedTx.s;

      const getAddress = await validator.recoverAddress(hashedST, v, r, s);

      expect(getAddress).to.equal(wallet.address);
    });
  });
});
