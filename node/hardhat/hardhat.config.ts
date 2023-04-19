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
        "0x5016647bfe5e64f3b5f101fef74419c88edc4f4a3790457e5f44bbbb18e99c72",
        "0x6f2402e8bd8027b406775126e7a91ad2d33810bb97df5f96170b10fdc8ae86c3",
        "0xa26b1aaa44b2e450028b0ce8c982edc4acfebd258a6b87fc8c1ced35568204ec",
        "0xbeec2ffbba1e9e20ac8576f67047123811b3170f9e8a0987e784a447c0c7c4b7",
        "0xe331b0ca57f33194d1c43c8a2dcf5447d1e1dd8737e32d37f10256c71becf9c7",
        "0xd6180c79953fbf4474dc2cb49e7c8f5c5d2aa6e0885e5b62e2b207114ba9fd0d",
        "0xc98cf9ea91578e7161a7e955d4c9c68a6beba3dc05af7e6807a93b73a780a6f3",
        "0x1578f0e502f47ce9a85026adc773acea03f94f6b31103ff7861eebd74b6415ce",
        "0x91ed17c2b38f0761653bacf31855b3e014724099a7f822bdadbe34925ca52051",
      ],
    },
  },
};

export default config;
