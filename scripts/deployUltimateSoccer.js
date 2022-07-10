  
const hre = require("hardhat");

async function main() {

  const UltimateSoccer= await hre.ethers.getContractFactory("UltimateSoccer");
  const ultimateSoccer = await UltimateSoccer.deploy();
  await ultimateSoccer.deployed();

  console.log("UltimateSoccer deployed to:", ultimateSoccer.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
