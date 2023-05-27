// add the game address here and update the contract name if necessary
const gameAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractName = "Game2";

async function main() {
    // attach to the game
    const game = await hre.ethers.getContractAt(contractName, gameAddr);

    // First we set x.
    const tx1 = await game.setX(10);
    await tx1;

    // Second, we set y so x + y = 50.
    const tx2 = await game.setY(40);

    // Finally, we win the game.
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
