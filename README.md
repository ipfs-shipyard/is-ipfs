is-ipfs
====

[![build status](https://secure.travis-ci.org/xicombd/is-ipfs.svg)](http://travis-ci.org/xicombd/is-ipfs)
[![dignified.js](https://img.shields.io/badge/follows-dignified.js-blue.svg?style=flat-square)](https://github.com/dignifiedquire/dignified.js)

A set of utilities to help identify [IPFS](https://ipfs.io/) resources.


## Install
```
npm i --save is-ipfs
```

## Usage
```javascript
const isIPFS = require('is-ipfs')

isIPFS.multihash('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true
isIPFS.multihash('noop') // false

isIPFS.url('https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true
isIPFS.url('https://ipfs.io/ipns/github.com') // true
isIPFS.url('https://github.com/ipfs/js-ipfs/blob/master/README.md') // false
isIPFS.url('https://google.com') // false

isIPFS.path('/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true
isIPFS.path('/ipns/github.com') // true
isIPFS.path('/ipfs/js-ipfs/blob/master/README.md') // false

isIPFS.urlOrPath('https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true
isIPFS.urlOrPath('https://ipfs.io/ipns/github.com') // true
isIPFS.urlOrPath('/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true
isIPFS.urlOrPath('/ipns/github.com') // true
isIPFS.urlOrPath('https://google.com') // false

isIPFS.ipfsUrl('https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true
isIPFS.ipfsUrl('https://ipfs.io/ipfs/invalid-hash') // false

isIPFS.ipnsUrl('https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // false
isIPFS.ipnsUrl('https://ipfs.io/ipns/github.com') // true

isIPFS.ipfsPath('/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true
isIPFS.ipfsPath('/ipfs/invalid-hash') // false

isIPFS.ipnsPath('/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // false
isIPFS.ipnsPath('/ipns/github.com') // true
```

## API

### `isIPFS.multihash(hash)`

Returns `true` if the provided string is a valid `multihash` or `false` otherwise.

### `isIPFS.url(url)`

Returns `true` if the provided string is a valid IPFS or IPNS url or `false` otherwise.

### `isIPFS.path(path)`

Returns `true` if the provided string is a valid IPFS or IPNS path or `false` otherwise.

### `isIPFS.urlOrPath(path)`

Returns `true` if the provided string is a valid IPFS or IPNS url or path or `false` otherwise.

### `isIPFS.ipfsUrl(url)`

Returns `true` if the provided string is a valid IPFS url or `false` otherwise.

### `isIPFS.ipnsUrl(url)`

Returns `true` if the provided string is a valid IPNS url or `false` otherwise.

### `isIPFS.ipfsPath(path)`

Returns `true` if the provided string is a valid IPFS path or `false` otherwise.

### `isIPFS.ipnsPath(path)`

Returns `true` if the provided string is a valid IPNS path or `false` otherwise.


**Note:** the regex used for these checks is also exported as `isIPFS.urlPattern`

## License


MIT
