# Yangster

A tool for working with the YANG language.


## Getting Started

1) Get Theia, sprotty, the YANG-LSP and this repo from github
```bash
git clone https://github.com/theia-ide/theia.git
git clone https://github.com/theia-ide/sprotty.git
git clone https://github.com/yang-tools/yangster.git
git clone https://github.com/yang-tools/yang-lsp.git
```
2a) Build the sprotty server part
```bash
cd sprotty/server
./gradlew install
```
2b) Build the sprotty client part
```bash
cd ../client
npm install
```
3a) Built Theia
```bash
cd ../../theia
npm install 
```
3b) Built the Theia generator
```bash
cd config/generator-theia
npm install
npm link
npm install -g yo
```
3c) Built the Theia local dependency manager
```bash
cd ../local-dependency-manager
npm install
```
4a) Build the YANG language server
```bash
cd ../../../yang-lsp/yang-lsp
./gradlew installDist
```
4b) Build the YANG theia extension
```bash
cd ../../yangster/theia-yang-extension
npm run bootstrap
```
4c) Build the YANG browser app
```bash
cd ../yangster-app
yo theia:browser
npm run start
```

## Connecting the LSP through a Socket
For development it is better to connect to the running LSP through a socket.
For that you need to start the yangster-app using
```bash
npm run start:backend:socket
```
And connect to it through http://localhost:3000.

It will try to connect to the language server that you now need to start from within Eclipse by launching `RunSocketServer`.