# smart-contract

### 사용법

1. 노드 모듈 설치
   ```
   yarn or pnpm i
   ```
2. 컨트랙트 컴파일 (생략가능, 배포 시 자동 컴파일)

   ```
   npx hardhat compile
   ```

3. 컨트랙트 배포

   ```
   npx hardhat run scripts/deploy.ts --network ganache
                     (배포 관련 파일)             (or localhost)
   ```

   - 개인적으로 ganache gui 사용하는 게 편해 ganache 로 테스트하고 있음

4. 컨트랙트 테스트

   ```
   npx hardhat test
   ```

5. (선택) api 생성 (abigen)

   ```
   ex)
   solc --optimize --abi ./contracts/Lock.sol -o build
   solc --optimize --bin ./contracts/Lock.sol -o build
   ./abigen --abi=./build/Lock.abi --bin=./build/Lock.bin --pkg=api --type Lock --out=./api/Lock.go

   solc : node module
   abigen : go-ethereum/build
   ```
