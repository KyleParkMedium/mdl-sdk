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

  async function deployVault() {
    const [adminMint, adminVault, middleMan] = await loadFixture(init);
    const VaultContract = await ethers.getContractFactory("Vault");

    const timeExample = BigNumber.from("0x7b");
    const timeString = timeExample.toString();

    const vault = await VaultContract.deploy(adminMint.address, timeString);
    await vault.deployed();

    vaultAddress = vault.address;
    return { vault };
  }

  async function deployMint() {
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

    return { mint };
  }

  it("should set contract address", async function () {
    describe("Deploy Vault", function () {
      it("should set contract address", async function () {
        const [adminMint, adminVault, middleMan] = await loadFixture(init);
        const { vault } = await loadFixture(deployVault);

        // check contract address

        // check admin address
        const getAddress = await vault.getAdmin();
        expect(getAddress).to.equal(adminMint.address);
      });
    });

    describe("Deploy Mint", function () {
      it("should set vault contract address to mint contract", async function () {
        const [adminMint, adminVault, middleMan] = await loadFixture(init);
        const { mint } = await loadFixture(deployMint);

        // check vault contract address
        const getVault = await mint.getVault();
        expect(getVault).to.equal(vaultAddress);
      });
    });
  });

  describe("Transfer Mint -> Vault Test", function () {
    it("should transfer mint -> vault", async function () {
      const [adminMint, adminVault, middleMan] = await loadFixture(init);
      const [user1] = await ethers.getSigners();
      const { vault } = await loadFixture(deployVault);
      const { mint } = await loadFixture(deployMint);
      await mint.setUser1({ from: user1.address });
      expect(await mint.balanceOf(user1.address)).to.equal("10000");
      const result = await mint._transfer(5000, { from: user1.address });
      console.log(result);
      // setUser1;
    });

    it("should receive ether or token", async function () {
      const [adminMint, adminVault, middleMan] = await loadFixture(init);
      const [user1] = await ethers.getSigners();
      const { vault } = await loadFixture(deployVault);
      const { mint } = await loadFixture(deployMint);
      // const provider = new ethers.providers.JsonRpcProvider();
      // const nonce = await provider.getTransactionCount(mint.address);
      const amount = ethers.utils.parseEther("0.1");
      // 이더 송금 트랜잭션 생성
      const tx = {
        to: vault.address,
        value: amount,
        gasLimit: 21000,
        gasPrice: ethers.utils.parseUnits("10", "gwei"),
        // nonce: nonce,
      };
      await user1.sendTransaction(tx);
      await vault.connect(user1).deposit({ value: amount });
      ethers.provider.sendTransaction;
      // 이더 송금
      await owner.sendTransaction(tx);
    });
  });
});
