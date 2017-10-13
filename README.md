# Yangster

A tool for working with the YANG language.

## Prerequisite

Install yarn.
Clone and build yang-lsp.

## Clone and Build Yangster

Requirements: Python 2, Java 8, node 8, yarn 1.0.2

```bash
git clone --recursive https://github.com/theia-ide/yangster.git && \
cd yangster && \
yarn 
```

For incremental development use 
```bash
yarn watch
```

Here is the complete script that also clones yang-lsp:
```bash
git clone https://github.com/theia-ide/yang-lsp.git \
&& ./yang-lsp/yang-lsp/gradlew -p yang-lsp/yang-lsp installDist --refresh-dependencies \
&& git clone --recursive https://github.com/theia-ide/yangster.git \
&& cd yangster \
&& yarn \
&& cd yangster-app \
&& yarn start
```

## Run Yangster

The browser version:
Run 
```bash
yarn rebuild:browser && \
cd yangster-app && \
yarn start
```
Then point your browser to `http://localhost:3000`.

The Electron version:
```bash
yarn rebuild:electron && \
cd yangster-app-electron && \
yarn start
```

## Connecting the LSP through a Socket
For development it is better to connect to the running LSP through a socket.
For that you need to start the yangster-app using
```bash
cd yangster-app && \
yarn run start:backend:socket
```

It will try to connect to the yang-lsp server that you now need to start from within Eclipse by launching `RunSocketServer`.
