compile:
	cd ../hardhat && npx hardhat compile

deploy:
	cd ../hardhat && npx hardhat run scripts/deployVault.ts --network ganache
	cd ../hardhat && npx hardhat run scripts/deployMint.ts --network ganache
	cd ../hardhat && npx hardhat run scripts/deployValidator.ts --network ganache 

deployTruffle:
	cd ../truffle && npx truffle migrate --network ganache