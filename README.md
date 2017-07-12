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
2) Build the sprotty server part
```
cd sprotty/server
./gradlew installDist
```
3) Build the YANG language server
```
cd ../../yang-lsp
./gradlew installDist
```
4) Build the YANG browser app
```
cd ../yangster/yangster-app
npm run bootstrap
npm run start
```
