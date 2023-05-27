const hre = require("hardhat");
require('dotenv').config();

const ADDRESS = "0xa6bce72d77d423c046472fe5e1c29f459631a1d0";

async function main() {

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_GOERLI_URL));
  const contract = new ethers.Contract("0x873289a1aD6Cf024B927bd13bd183B264d274c68", '[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"}],"name":"Winner","type":"event"},{"inputs":[{"internalType":"address","name":"erc20","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"drop","outputs":[],"stateMutability":"nonpayable","type":"function"}]', wallet.provider);

  const fernetCoin = await hre.ethers.getContractAt("FernetCoin", ADDRESS);
  const tx1 = await fernetCoin.connect(wallet).approve("0x873289a1aD6Cf024B927bd13bd183B264d274c68", 1);
  console.log(await tx1.wait());

  const tx2 = await contract.connect(wallet).drop(ADDRESS, 1);

  console.log(await tx2.wait());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
