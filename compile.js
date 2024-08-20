const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname,'Tracking.sol');

const source = fs.readFileSync(inboxPath, 'utf-8');
const temp = solc.compile(source, 1);

module.exports = temp.contracts[':Tracking'];