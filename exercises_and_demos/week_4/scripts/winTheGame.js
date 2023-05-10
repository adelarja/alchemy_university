const hre = require("hardhat");

const ADDRESS = "0xa3ed035EFaa28fFcD30cfB6fb1a453eb25FFC977";

async function main() {

  const contract = await hre.ethers.getContractAt("ProxyContract", ADDRESS);
  
  const tx = await contract.win();

  await tx.wait();

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
