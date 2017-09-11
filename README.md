# Yangster

A tool for working with the YANG language.

## Prerequisite

Install yarn.
Clone and build yang-lsp.

## Clone and Build Yangster

Requirements: Yeoman, Python 3, Java 8

```bash
git clone --recursive https://github.com/yang-tools/yangster.git && \
cd yangster && \
yarn install && \
yarn run setup && \
yarn run build
```

For incremental development use 
```bash
yarn run watch
```

Here is the complete script that also clones yang-lsp.
```bash
git clone https://github.com/yang-tools/yang-lsp.git \
&& ./yang-lsp/yang-lsp/gradlew -p yang-lsp/yang-lsp installDist --refresh-dependencies \
&& git clone --recursive https://github.com/yang-tools/yangster.git \
&& cd yangster \
&& yarn install \
&& yarn run setup \
&& yarn run build \
&& cd yangster-app \
&& yarn run start
```

## Run Yangster

```bash
cd yangster-app && \
yarn run start
```

Open browser on 'http://localhost:3000'.

## Connecting the LSP through a Socket
For development it is better to connect to the running LSP through a socket.
For that you need to start the yangster-app using
```bash
yarn run start:backend:socket
```

It will try to connect to the yang-lsp server that you now need to start from within Eclipse by launching `RunSocketServer`.
