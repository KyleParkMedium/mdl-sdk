const fs = require("fs");
const Validator = artifacts.require("Validator");

module.exports = async function (deployer) {
  await deployer.deploy(Validator);
  const deployedValidator = await Validator.deployed();
  fs.writeFileSync(
    `./logs/ValidatorAddress.txt`,
    deployedValidator.address,
    function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    }
  );
};
