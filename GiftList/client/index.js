const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list?

  let name = "Adel Arja";
  let merkleTree = new MerkleTree(niceList);
  let index = niceList.findIndex(n => n === name);
  let proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    // As a client, we'll send the value (our name) and the proof so the server can verify that we are part of the list.
    proof: proof,
    name: name
  });

  console.log({ gift });
}

main();