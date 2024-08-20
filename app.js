const express = require('express');
const app = express();

const { Web3 } = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const node_url = "https://eth-sepolia.g.alchemy.com/v2/f3PuHCUBfSWioccStfy_E6aa9TVfbku3";
const provider = new HDWalletProvider(
    "rude feature sauce armed resist sunset actual marble wall desert chair dwarf",
    node_url
);
const web3 = new Web3(provider);
const address = "0x6dd7cC7f322B16C1E8Be76fDFc7bAA43D7562dfb";
const abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "count",
        "outputs": [{"name": "", "type": "int256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "addCount",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getCount",
        "outputs": [{"name": "", "type": "int256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"name": "initialCount", "type": "int256"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }
];
const contract = new web3.eth.Contract(abi, address);

app.use(express.json());

app.get('/result', async (req, res) => {
    try {
      const getCount = await contract.methods.getCount().call();
      res.json({
          count: getCount.toString()
      });
    } catch (error) {
      res.status(500).json({
          message: "Error retrieving count",
          error: error.message
      });
    }
});

app.get('/track', async (req, res) => {
  try {
    const accounts = await web3.eth.getAccounts();

    await contract.methods.addCount().send({
      from: accounts[0],
      value: web3.utils.toWei('0', 'wei')
    });

    res.json({
        message: "Track Success",
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
        message: "Error retrieving count",
        error: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});