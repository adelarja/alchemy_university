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

function TransactionsList() {
  const [blockHash, setBlockHash] = useState();
  const [transactions, setTransactions] = useState();

  const handleButtonClick = async () => {
    setTransactions((await alchemy.core.getBlock(blockHash)).transactions);
  };

  const prettyJson = () => {
    return <pre>{JSON.stringify(transactions, null, 2)}</pre>;
  };

  return (
    <div>
      <label>
        BlockHash:
        <input
          type="text"
          value={blockHash}
          onChange={(event) => setBlockHash(event.target.value)}
        />
      </label>
      <br />
      <button onClick={handleButtonClick}>Call SDK API</button>
      <h1>Transaction List in Block:</h1>
      <div>{prettyJson()}</div>
    </div>
  );
}

export default TransactionsList;
