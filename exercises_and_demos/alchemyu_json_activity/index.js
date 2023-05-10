require('dotenv').config();
const ethers = require('ethers');

const contractABI = [{"inputs":[],"name":"count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dec","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"get","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"inc","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const provider = new ethers.AlchemyProvider(
	'goerli',
	process.env.TESTNET_ALCHEMY_KEY
);

const wallet = new ethers.Wallet(process.env.TESTNET_PRIVATE_KEY, provider);

async function main() {
	const counterContract = new ethers.Contract(
		'0x5F91eCd82b662D645b15Fd7D2e20E5e5701CCB7A',
		contractABI,
		wallet
	);
	console.log((await counterContract.count()).toString());
	await counterContract.inc();
	console.log((await counterContract.count()).toString());
}

main();
