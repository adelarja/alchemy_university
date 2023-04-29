const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix

// We know the nicelist root. So what we do is to 
const MERKLE_ROOT = '02deab0e2355c295cf78e5486796b6bb97f4d7c1d1aed363a76181f3799b55e5';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;

  let isInTheList = verifyProof(body['proof'], body['name'], MERKLE_ROOT);

  // TODO: prove that a name is in the list 
  // const isInTheList = false;
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
