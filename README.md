is-ipfs 🕵️
====

[![](https://img.shields.io/github/release/ipfs/is-ipfs.svg)](https://github.com/ipfs/is-ipfs/releases/latest)
[![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](https://webchat.freenode.net/?channels=%23ipfs)

> A set of utilities to help identify [IPFS](https://ipfs.io/) resources

## Lead Maintainer

[Marcin Rataj](https://github.com/lidel)

# Install

### In Node.js through npm

```bash
$ npm install --save is-ipfs
```

### Browser: Browserify, Webpack, other bundlers

The code published to npm that gets loaded on require is in fact an ES5 transpiled version with the right shims added. This means that you can require it and use with your favorite bundler without having to adjust asset management process.

```js
const isIPFS = require('is-ipfs')
```


### In the Browser through `<script>` tag

Loading this module through a script tag will make the ```IsIpfs``` obj available in the global namespace.

```html
<script src="https://unpkg.com/is-ipfs/dist/index.min.js"></script>
<!-- OR -->
<script src="https://unpkg.com/is-ipfs/dist/index.js"></script>
```

# Usage
```javascript
const isIPFS = require('is-ipfs')

isIPFS.multihash('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true
isIPFS.multihash('noop') // false

isIPFS.cid('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true (CIDv0)
isIPFS.cid('bafybeiasb5vpmaounyilfuxbd3lryvosl4yefqrfahsb2esg46q6tu6y5q') // true (CIDv1 in Base32)
isIPFS.cid('zdj7WWeQ43G6JJvLWQWZpyHuAMq6uYWRjkBXFad11vE2LHhQ7') // true (CIDv1 in Base58btc)
isIPFS.cid('noop') // false

isIPFS.base32cid('bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va') // true
isIPFS.base32cid('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // false

isIPFS.url('https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true
isIPFS.url('https://ipfs.io/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR?filename=guardian.jpg') // true
isIPFS.url('https://ipfs.io/ipns/github.com') // true
isIPFS.url('https://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link') // true
isIPFS.url('http://en.wikipedia-on-ipfs.org.ipfs.localhost:8080') // true
isIPFS.url('https://github.com/ipfs/js-ipfs/blob/master/README.md') // false
isIPFS.url('https://google.com') // false

isIPFS.path('/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true
isIPFS.path('/ipfs/QmbcBPAwCDxRMB1Qe7CRQmxdrTSkxKwM9y6rZw2FjGtbsb/?weird-filename=test.jpg') // true
isIPFS.path('/ipns/github.com') // true
isIPFS.path('/ipfs/js-ipfs/blob/master/README.md') // false

isIPFS.urlOrPath('https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true
isIPFS.urlOrPath('https://ipfs.io/ipns/github.com') // true
isIPFS.urlOrPath('/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true
isIPFS.urlOrPath('/ipns/github.com') // true
isIPFS.urlOrPath('https://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link') // true
isIPFS.urlOrPath('https://google.com') // false

isIPFS.ipfsUrl('https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true
isIPFS.ipfsUrl('https://ipfs.io/ipfs/invalid-hash') // false

isIPFS.ipnsUrl('https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // false
isIPFS.ipnsUrl('https://ipfs.io/ipns/github.com') // true

isIPFS.ipfsPath('/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true
isIPFS.ipfsPath('/ipfs/invalid-hash') // false

isIPFS.ipnsPath('/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // false
isIPFS.ipnsPath('/ipns/github.com') // true

isIPFS.cidPath('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o/path/to/file') // true
isIPFS.cidPath('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o/') // true
isIPFS.cidPath('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // false
isIPFS.cidPath('/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // false
isIPFS.cidPath('/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o/file') // false

isIPFS.subdomain('http://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link') // true
isIPFS.subdomain('http://bafybeiabc2xofh6tdi6vutusorpumwcikw3hf3st4ecjugo6j52f6xwc6q.ipns.dweb.link') // true
isIPFS.subdomain('http://www.bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link') // false
isIPFS.subdomain('http://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.dweb.link') // false

isIPFS.ipfsSubdomain('http://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link') // true
isIPFS.ipfsSubdomain('http://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.dweb.link') // false

isIPFS.ipnsSubdomain('http://bafybeiabc2xofh6tdi6vutusorpumwcikw3hf3st4ecjugo6j52f6xwc6q.ipns.dweb.link') // true
isIPFS.ipnsSubdomain('http://bafybeiabc2xofh6tdi6vutusorpumwcikw3hf3st4ecjugo6j52f6xwc6q.dweb.link') // false
isIPFS.ipnsSubdomain('http://QmcNioXSC1bfJj1dcFErhUfyjFzoX2HodkRccsFFVJJvg8.ipns.dweb.link') // false
isIPFS.ipnsSubdomain('http://en.wikipedia-on-ipfs.org.ipns.localhost:8080') // true (assuming DNSLink)
isIPFS.ipnsSubdomain('http://en-wikipedia--on--ipfs-org.ipns.localhost:8080') // true (assuming inlined DNSLink)
isIPFS.ipnsSubdomain('http://hostname-without-tld-.ipns.dweb.link') // false (not a CID, invalid DNS label)

isIPFS.multiaddr('/ip4/127.0.0.1/udp/1234') // true
isIPFS.multiaddr('/ip4/127.0.0.1/udp/1234/http') // true
isIPFS.multiaddr('/ip6/::1/udp/1234') // true
isIPFS.multiaddr('ip6/::1/udp/1234') // false
isIPFS.multiaddr('/yoloinvalid/::1/udp/1234') // false

isIPFS.peerMultiaddr('/p2p/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4') // true
isIPFS.peerMultiaddr('/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4') // true (legacy notation)
isIPFS.peerMultiaddr('/ip4/127.0.0.1/tcp/1234/ws/p2p/QmUjNmr8TgJCn1Ao7DvMy4cjoZU15b9bwSCBLE3vwXiwgj') // true
isIPFS.peerMultiaddr('/p2p/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4/p2p-circuit/p2p/QmUjNmr8TgJCn1Ao7DvMy4cjoZU15b9bwSCBLE3vwXiwgj') // true
isIPFS.peerMultiaddr('/dnsaddr/bootstrap.libp2p.io') // false (key missing, needs additional DNS lookup to tell if this is valid)
isIPFS.peerMultiaddr('/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN') // true (key present, ip and port can be resolved later)
isIPFS.peerMultiaddr('/ip4/127.0.0.1/udp/1234') // false (key missing)
```

# API

A suite of util methods that provides efficient validation.

Detection of IPFS Paths and identifiers in URLs is a two-stage process:
1.  `pathPattern`/`pathGatewayPattern`/`subdomainGatewayPattern` regex is applied to quickly identify potential candidates
2.  proper CID validation is applied to remove false-positives

## Content Identifiers

### `isIPFS.multihash(hash)`

Returns `true` if the provided string or `Uint8Array`  is a valid `multihash` or `false` otherwise.

### `isIPFS.cid(hash)`

Returns `true` if the provided string, `Uint8Array`  or [`CID`](https://github.com/multiformats/js-multiformats/#readme) object represents a valid [CID](https://docs.ipfs.io/guides/concepts/cid/) or `false` otherwise.

### `isIPFS.base32cid(hash)`

Returns `true` if the provided string is a valid `CID` in Base32 encoding or `false` otherwise.

## URLs

### `isIPFS.url(url)`

Returns `true` if the provided string is a valid IPFS or IPNS url or `false` otherwise.

### `isIPFS.ipfsUrl(url)`

Returns `true` if the provided string is a valid IPFS url or `false` otherwise.

### `isIPFS.ipnsUrl(url)`

Returns `true` if the provided string is a valid IPNS url or `false` otherwise.

## Paths

Standalone validation of IPFS Paths: `/ip(f|n)s/<cid>/..`

### `isIPFS.path(path)`

Returns `true` if the provided string is a valid IPFS or IPNS path or `false` otherwise.

### `isIPFS.urlOrPath(path)`

Returns `true` if the provided string is a valid IPFS or IPNS url or path or `false` otherwise.

### `isIPFS.ipfsPath(path)`

Returns `true` if the provided string is a valid IPFS path or `false` otherwise.

### `isIPFS.ipnsPath(path)`

Returns `true` if the provided string is a valid IPNS path or `false` otherwise.

### `isIPFS.cidPath(path)`

Returns `true` if the provided string is a valid "CID path" (IPFS path without `/ipfs/` prefix) or `false` otherwise.


## Subdomains

Validated subdomain convention: `cidv1b32.ip(f|n)s.domain.tld`

### `isIPFS.subdomain(url)`

Returns `true` if the provided `url` string includes a valid IPFS, looks like IPNS/DNSLink subdomain or `false` otherwise.

### `isIPFS.ipfsSubdomain(url)`

Returns `true` if the provided `url` string includes a valid IPFS subdomain (case-insensitive CIDv1) or `false` otherwise.

### `isIPFS.ipnsSubdomain(url)`

Returns `true` if the provided `url` string looks like a valid IPNS subdomain
(CIDv1 with `libp2p-key` multicodec or something that looks like a FQDN, for example `en.wikipedia-on-ipfs.org.ipns.localhost:8080`) or `false`
otherwise.

**Note:** `ipnsSubdomain` method works in offline mode: it does not perform
actual IPNS record lookup over DHT or other content routing method. It may
return false-positives:

- To ensure IPNS record  exists, make a call to `/api/v0/name/resolve?arg=<ipnsid>`
- To ensure DNSLink exists, make a call to `/api/v0/dns?arg=<fqdn>`


## Multiaddrs

Below methods provide basic detection of [multiaddr](https://github.com/multiformats/multiaddr)s: composable and future-proof network addresses.

Complex validation of multiaddr can be built using `isIPFS.multiaddr` and  [`mafmt`](https://github.com/multiformats/js-mafmt) library.

### `isIPFS.multiaddr(addr)`

Returns `true` if the provided `string`, [`Multiaddr`](https://github.com/multiformats/js-multiaddr) or `Uint8Array` represents a valid multiaddr or `false` otherwise.

### `isIPFS.peerMultiaddr(addr)`

Returns `true` if the provided `string`, [`Multiaddr`](https://github.com/multiformats/js-multiaddr) or `Uint8Array` represents a valid libp2p peer multiaddr (matching [`P2P` format from `mafmt`](https://github.com/multiformats/js-mafmt#api)) or `false` otherwise.

# License

MIT
