import { useState } from 'react';
import axios from 'axios';

const niceList = require('./niceList.json');
const MerkleTree = require('./MerkleTree');

const serverUrl = 'http://localhost:1225';


function App() {
  const [name, setName] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  function handleChange(event) {
    setName(event.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let merkleTree = new MerkleTree(niceList);
    let index = niceList.findIndex(n => n === name);
    let proof = merkleTree.getProof(index);

    console.log(proof);
    // const { data: gift } = axios.post(`${serverUrl}/gift`, { name })
    //   .then(response => {
    //     console.log(gift);
    //     setResponseMessage(gift);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    try {
      const response = await axios.post(`${serverUrl}/gift`, { name: name, proof: proof });
      console.log(response.data); // TODO: Handle response from server
      setResponseMessage(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleChange} />
        </label>
        <button type="submit">Verify</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default App;
