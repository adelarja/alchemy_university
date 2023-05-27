// add the game address here and update the contract name if necessary
const gameAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractName = "Game5";

async function main() {
    // attach to the game
    const game = await hre.ethers.getContractAt(contractName, gameAddr);

    // Get 10000 allowance.
    const tx1 = await game.giveMeAllowance(10001);
    await tx1;

    // Mint 10000 tokens.
    const tx2 = await game.mint(10001);
    await tx2;

    // Finally, win the game.
    const tx3 = await game.win();

    // did you win? Check the transaction receipt!
    // if you did, it will be in both the logs and events array
    const receipt = await tx3.wait();
    console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
