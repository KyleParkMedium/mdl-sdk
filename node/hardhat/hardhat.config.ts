import { HardhatUserConfig } from "hardhat/config";

import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ganache: {
      url: "http://127.0.0.1:7545",
      chainId: 1337,
      gasPrice: 20000000000,
      accounts: [
        // example
        "0x6e4b353c3dd573c8ff7eb97b25c2bb4a6d6c36a0c394769d4892b9bae3953bfa",
      ],
    },
  },
};

export default config;
