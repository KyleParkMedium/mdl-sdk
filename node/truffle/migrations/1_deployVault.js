const fs = require("fs");
const Vault = artifacts.require("Vault");

module.exports = async function (deployer) {
  const admin = "0xaD1a8D6ec690f7493140353979Cc1aa533AD52CD";
  const time = "0x0";
  await deployer.deploy(Vault, admin, time);
  const deployedVault = await Vault.deployed();

  fs.writeFileSync(
    `./logs/VaultAddress.txt`,
    deployedVault.address,
    function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    }
  );
};
