const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: In the future, I'll try to improve this part of the project creating a frontend.
  let name = "Adel Arja";
  let merkleTree = new MerkleTree(niceList);
  let index = niceList.findIndex(n => n === name);
  let proof = merkleTree.getProof(index);

  // As a client, we'll send the value (our name) and the proof so the server can verify that we are part of the list.
  // If we provide a name that is in the list, we receive the message "You got a toy robot!".
  // If we provide a name that is not in the list, we receive the message "You are not on the list :(".
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof: proof,
    name: name
  });

  console.log({ gift });
}

main();