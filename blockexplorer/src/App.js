import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockHash, setBlockHash] = useState();
  const [blockDifficulty, setBlockDifficulty] = useState();
  const [BlockParentHash, setParentHash] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
      setBlockHash((await alchemy.core.getBlock(blockNumber)).hash);
      setBlockDifficulty((await alchemy.core.getBlock(blockNumber)).difficulty);
      setParentHash((await alchemy.core.getBlock(blockNumber)).parentHash);
      console.log(await alchemy.core.getBlock(blockNumber));
    }

    getBlockNumber();
  });

  return <div>
  <div className="App">Block Number: {blockNumber}</div>
  <div className="App">Hash: {blockHash}</div>
  <div className="App">Parent Hash: {BlockParentHash}</div>
  <div className="App">Difficulty: {blockDifficulty}</div>
  </div>
}

function TransactionInfo() {
  const [blockNumber, setBlockNumber] = useState();
  const [transactionHash, setTransactionHash] = useState("");
  const [transactionReceipt, setTransactionReceipt] = useState();

  const handleButtonClick = async () => {
    setTransactionReceipt(await alchemy.core.getTransactionReceipt(transactionHash));
  };

  const prettyJson = () => {
    return <pre>{JSON.stringify(transactionReceipt, null, 2)}</pre>;
  };

  return (
    <div>
      <label>
        Block Number:
        <input
          type="text"
          value={blockNumber}
          onChange={(event) => setBlockNumber(event.target.value)}
        />
      </label>
      <br />
      <label>
        Transaction Hash:
        <input
          type="text"
          value={transactionHash}
          onChange={(event) => setTransactionHash(event.target.value)}
        />
      </label>
      <br />
      <button onClick={handleButtonClick}>Call SDK API</button>
      <h1>Transaction Receipt:</h1>
      <div>{prettyJson()}</div>
    </div>
  );
}

export default App;
