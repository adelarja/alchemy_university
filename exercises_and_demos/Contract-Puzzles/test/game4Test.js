const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    const signer1 = ethers.provider.getSigner(0);
    const signer2 = ethers.provider.getSigner(1);

    const addr1 = signer1.getAddress();
    const addr2 = signer2.getAddress();

    game.connect(signer1).write(addr2);

    await game.connect(signer2).win(addr1);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
