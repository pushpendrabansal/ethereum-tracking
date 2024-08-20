const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');

const { interface, bytecode } = require('./compile');

const node_url = "https://eth-sepolia.g.alchemy.com/v2/f3PuHCUBfSWioccStfy_E6aa9TVfbku3";

const provider = new HDWalletProvider(
    "rude feature sauce armed resist sunset actual marble wall desert chair dwarf",
    node_url,
);

const web3 = new Web3(provider);

const deploy = async ( ) => {

    const accounts = await web3.eth.getAccounts();

    console.log(`Got ${accounts.length} accounts`);
    console.log(accounts)

    const inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode,arguments: [0]})
    .send({from: accounts[0],gas: '1000000'});

    console.log(interface);
    console.log(`Contract deployed to ${inbox.options.address}`);
}

deploy().then(() => {
  process.exit(0);
});