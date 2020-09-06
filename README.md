# Legit-Polls
An Ethereum based decentralised platform for legitimate polls.

A blockchain implimentation of a polling system that makes sure every vote counts.

### Dependencies

[node](https://nodejs.org/en/download/)

A wallet like [Metamask](https://metamask.io/) in your browser.

For your wallet set a custom RPC to localhost:7545 and import accounts from ganache-cli by copying private keys.
### Install truffle and ganache-cli
```
$ npm install -g truffle
$ npm install -g ganache-cli
```
### Installation of Legit-Polls
```
$ git clone https://github.com/UltimateRoman/Legit-Polls.git
$ cd Legit-Polls
$ npm install
$ ganache-cli -p 7545
$ truffle migrate --reset
$ npm run start
```

