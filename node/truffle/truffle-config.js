module.exports = {
  compilers: {
    solc: {
      version: "0.8.18",
    },
  },

  contracts_directory: "./contracts",
  contracts_build_directory: "./build/contracts",

  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      network_id: "*",
    },
  },
};
