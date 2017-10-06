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

Here is the complete script that also clones yang-lsp.
```bash
git clone https://github.com/theia-ide/yang-lsp.git \
&& ./yang-lsp/yang-lsp/gradlew -p yang-lsp/yang-lsp installDist --refresh-dependencies \
&& git clone --recursive https://github.com/theia-ide/yangster.git \
&& cd yangster \
&& yarn 
&& cd yangster-app \
&& yarn run start
```

## Run Yangster

The browser version:
Run 
```bash
cd yangster-app && \
yarn run start
```
Then point your browser to `http://localhost:3000`.

The Electron version:
```bash
cd yangster-app && \
yarn run start
```
