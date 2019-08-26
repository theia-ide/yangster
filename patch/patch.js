// @ts-check

const { ncp } = require('ncp');
const path = require('path');

console.log('Patching Theia code.');

const to = path.join(__dirname, '..', 'node_modules', '@theia', 'monaco');
const from = path.join(__dirname, 'packages', 'monaco');

ncp(from, to, error => {
    if (error) {
        throw error;
    }
    console.log('Patched!');
})
