# Yangster

A tool for working with the YANG language.

## Prerequisite

Install yarn.
Clone and build yang-lsp.

## Clone and Build Yangster

```bash
git clone https://github.com/yang-tools/yangster.git && \
cd yangster && \
yarn install && \
yarn run setup && \
yarn run build
```

For incremental development use 
```bash
yarn run watch
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