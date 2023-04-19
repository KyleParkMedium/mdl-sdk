const fs = require("fs");
const Mint = artifacts.require("Mint");

module.exports = async function (deployer) {
  const vaultContractAddress = fs.readFileSync(`./logs/VaultAddress.txt`);

  await deployer.deploy(
    Mint,
    vaultContractAddress.toString(),
    "0x26d3Ef03ca9dC1281b4eC716e818dAA850e4Be57",
    "name",
    "symbol",
    100000
  );
  const deployedMint = await Mint.deployed();
  fs.writeFileSync(
    `./logs/MintAddress.txt`,
    deployedMint.address,
    function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    }
  );
};
