const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const balances = {
  "02f19c9bfe36f2195688fa72ff6e1efb07c8efa28fc811cdc46e44bf3a2a9064a8": 100, // df3136460a2b9f631d41a6ab3aaa24647da5fc32b79d2eb5200095522eeda3a7
  "02c6d1091c7e09b437e926373b3284a07078182463952521cbb1d11a982072f936": 50, // 4af60017c1856f929fd6f57d6abb1b1ad8a0f36f85618473e281e57896e1e758
  "03c40507700611f9d225b8552b52a2d1902476cd119be9dbda232ec81efd099e7f": 75, // e67bd592729ab28f22dec36ebedbb781c3fce7686545cffd1bbbf2d9a96f97b2
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { recipient, amount, privateKey } = req.body;

  if (!secp.secp256k1.utils.isValidPrivateKey(privateKey)){
    res.status(400).send({message: "Invalid private key!"});
  }

  const sender = toHex(secp.secp256k1.getPublicKey(privateKey));

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
