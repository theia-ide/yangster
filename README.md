# Yangster

A tool for working with the YANG language.


## Getting Started

1) Get Theia, sprotty and this repo from github
```{bash}
git clone https://github.com/theia-ide/theia.git
git clone https://github.com/theia-ide/sprotty.git
git clone https://github.com:yang-tools/yangster.git
git clone https://github.com:yang-tools/yang-lsp.git
```
2a) Build the sprotty server part
```
cd sprotty/server
./gradlew installg
```
2b) Build the sprotty client part
```
cd ../client
npm install
```
3a) Built Theia
```
cd ../../theia
npm install 
```
3b) Built the Theia generator
```
cd config/generator-theia
npm install
npm link
npm install -g yo
```
4a) Build the YANG language server
```
cd ../../../yang-lsp
./gradlew installDist
```
4b) Build the YANG theia extension
```
cd ../yangster/theia-yang-extension
npm run bootstrap
```
4c) Build the YANG browser app
```
cd ../yangster/yangster-app
yo theia:browser
npm run start
```
