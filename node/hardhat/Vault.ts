import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "@ethersproject/bignumber";

describe("Init bridge A -> B", function () {
  async function init() {
    const [adminMint, adminVault, middleMan] = await ethers.getSigners();
    return [adminMint, adminVault, middleMan];
  }

  let vaultAddress: string;

  it("should set contract address", async function () {
    describe("Deploy Vault", function () {
      it("should set contract address", async function () {
        const [adminMint, adminVault, middleMan] = await loadFixture(init);
        const VaultContract = await ethers.getContractFactory("Vault");

        const timeExample = BigNumber.from("0x7b");
        const timeString = timeExample.toString();

        const vault = await VaultContract.deploy(adminMint.address, timeString);
        await vault.deployed();

        // check contract address

        // check admin address
        const getAddress = await vault.getAdmin();
        expect(getAddress).to.equal(adminMint.address);

        vaultAddress = vault.address;
      });
    });

    describe("Deploy Mint", function () {
      it("should set vault contract address to mint contract", async function () {
        const [adminMint, adminVault, middleMan] = await loadFixture(init);

        const MintContract = await ethers.getContractFactory("Mint");

        const name = "name";
        const symbol = "symbol";
        const totalSupply = BigNumber.from("0x0");
        const totalSupplyString = totalSupply.toString();

        const mint = await MintContract.deploy(
          vaultAddress,
          middleMan.address,
          name,
          symbol,
          totalSupplyString
        );
        await mint.deployed();

        // check vault contract address
        const getVault = await mint.getVault();
        expect(getVault).to.equal(vaultAddress);
      });

      it("should transfer mint -> vault", async function () {
        // setUser1;
      });
    });
  });
});

//   describe("Deploy Mint", function () {});

//   const MintContract = await ethers.getContractFactory("Mint");

//   const timeExample = BigNumber.from("0x7b");
//   const timeString = timeExample.toString();

//   const vault = await MintContract.deploy(timeString);

//   await vault.deployed();

//   return { vault, admin, account1, account2, account3 };
// }

// describe("Deployment", function () {
//   it("Should set the right owner", async function () {
//     const { vault, admin } = await loadFixture(init);

//     // console.log(vault);
//     console.log(admin);
//     // expect(await vault.admin()).to.equal(admin.address);
//   });
// });

// describe("Deployment", function () {
//   it("Should set the right owner", async function () {
//     const { vault, admin } = await loadFixture(init);

//     // console.log(vault);
//     console.log(admin);
//     // expect(await vault.admin()).to.equal(admin.address);
//   });
// });

// describe("Set MultiSig Wallet", function () {
//   it("Run MultiSigWallet Function", async function () {
//     const { multisig, account1, account2 } = await loadFixture(init);
//     const addresses: string[] = [account1.address, account2.address];
//     const required = 2;

//     await multisig.MultiSigWallet(addresses, required);
//     expect(await multisig.checkOwner()).to.equal(required);

//     expect(await multisig.getOwners()).to.deep.equal(addresses);
//   });

//   it("Check duplication addresses", async function () {
//     const { multisig, account1, account2 } = await loadFixture(init);
//     const addresses: string[] = [account1.address, account2.address];
//     const required = 2;

//     await multisig.MultiSigWallet(addresses, required);
//     expect(await multisig.checkOwner()).to.equal(required);

//     await multisig.MultiSigWallet(addresses, required);
//     expect(await multisig.checkOwner()).to.equal(required);
//   });

//   it("Add semi-duplication addresses", async function () {
//     const { multisig, account1, account2, account3 } = await loadFixture(
//       init
//     );
//     const addresses: string[] = [account1.address, account2.address];
//     const otherAddresses: string[] = [account2.address, account3.address];
//     const fullAddresses: string[] = [
//       account1.address,
//       account2.address,
//       account3.address,
//     ];
//     const required = 2;

//     await multisig.MultiSigWallet(addresses, required);
//     expect(await multisig.checkOwner()).to.equal(required);

//     await multisig.MultiSigWallet(otherAddresses, required);
//     expect(await multisig.checkOwner()).to.equal(required + 1);

//     expect(await multisig.getOwners()).to.deep.equal(fullAddresses);
//   });
// });
// });
