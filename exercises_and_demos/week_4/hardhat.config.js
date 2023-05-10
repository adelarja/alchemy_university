require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      gas: 8000000, //units of gas you are willing to pay, aka gas limit
      gasPrice:  1000000000, //gas is typically in units of gwei, but you must enter it as wei here
    }
  },
};
