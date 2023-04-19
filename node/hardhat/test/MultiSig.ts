import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("MultiSig", function () {
  async function init() {
    const [admin, account1, account2, account3] = await ethers.getSigners();
    const MultiSigContract = await ethers.getContractFactory("MultiSig");
    const multisig = await MultiSigContract.deploy({});
    await multisig.deployed();

    return { multisig, admin, account1, account2, account3 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { multisig, admin } = await loadFixture(init);
      expect(await multisig.admin()).to.equal(admin.address);
    });
  });

  describe("Set MultiSig Wallet", function () {
    it("Run MultiSigWallet Function", async function () {
      const { multisig, account1, account2 } = await loadFixture(init);
      const addresses: string[] = [account1.address, account2.address];
      const required = 2;

      await multisig.MultiSigWallet(addresses, required);
      expect(await multisig.checkOwner()).to.equal(required);

      expect(await multisig.getOwners()).to.deep.equal(addresses);
    });

    it("Check duplication addresses", async function () {
      const { multisig, account1, account2 } = await loadFixture(init);
      const addresses: string[] = [account1.address, account2.address];
      const required = 2;

      await multisig.MultiSigWallet(addresses, required);
      expect(await multisig.checkOwner()).to.equal(required);

      await multisig.MultiSigWallet(addresses, required);
      expect(await multisig.checkOwner()).to.equal(required);
    });

    it("Add semi-duplication addresses", async function () {
      const { multisig, account1, account2, account3 } = await loadFixture(
        init
      );
      const addresses: string[] = [account1.address, account2.address];
      const otherAddresses: string[] = [account2.address, account3.address];
      const fullAddresses: string[] = [
        account1.address,
        account2.address,
        account3.address,
      ];
      const required = 2;

      await multisig.MultiSigWallet(addresses, required);
      expect(await multisig.checkOwner()).to.equal(required);

      await multisig.MultiSigWallet(otherAddresses, required);
      expect(await multisig.checkOwner()).to.equal(required + 1);

      expect(await multisig.getOwners()).to.deep.equal(fullAddresses);
    });
  });
});
