is-ipfs
====

[![build status](https://secure.travis-ci.org/xicombd/is-ipfs.png)](http://travis-ci.org/xicombd/is-ipfs)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

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
isIPFS.url('https://ipfs.io/ipfs/github.com') // true
isIPFS.url('https://github.com/ipfs/js-ipfs/blob/master/README.md') // false
isIPFS.url('https://google.com') // false

isIPFS.ipfsUrl('https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true
isIPFS.ipfsUrl('https://ipfs.io/ipfs/github.com') // false

isIPFS.ipnsUrl('https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // false
isIPFS.ipnsUrl('https://ipfs.io/ipfs/github.com') // true
```

## API

### `isIPFS.multihash(hash)`

Returns `true` if the provided string is a valid `multihash` or `false` otherwise.

### `isIPFS.url(url)`

Returns `true` if the provided string is a valid IPFS or IPNS url or `false` otherwise.

### `isIPFS.ipfsUrl(url)`

Returns `true` if the provided string is a valid IPFS url or `false` otherwise.

### `isIPFS.ipnsUrl(url)`

Returns `true` if the provided string is a valid IPNS url or `false` otherwise.


**Note:** the regex used for these checks is also exported as `isIPFS.urlPattern`

## License


MIT
