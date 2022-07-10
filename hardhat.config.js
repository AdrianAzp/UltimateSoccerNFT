require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
/**
* @type import('hardhat/config').HardhatUserConfig
*/
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();
const { POLYGON_MUMBAI_RPC_PROVIDER, PRIVATE_KEY, POLYGONSCAN_API_KEY  } = process.env;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {
    },
     mumbai: {
      url: POLYGON_MUMBAI_RPC_PROVIDER,
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY,
 }
}