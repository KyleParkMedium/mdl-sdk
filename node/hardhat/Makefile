sol:
	solc --optimize --abi ./contracts/Lock.sol -o build
	solc --optimize --bin ./contracts/Lock.sol -o build
	./abigen --abi=./build/Lock.abi --bin=./build/Lock.bin --pkg=api --type Lock --out=./api/Lock.go