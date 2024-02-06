# is-ipfs <!-- omit in toc -->

[![codecov](https://img.shields.io/codecov/c/github/ipfs-shipyard/is-ipfs.svg?style=flat-square)](https://codecov.io/gh/ipfs-shipyard/is-ipfs)
[![CI](https://img.shields.io/github/actions/workflow/status/ipfs-shipyard/is-ipfs/js-test-and-release.yml?branch=master\&style=flat-square)](https://github.com/ipfs-shipyard/is-ipfs/actions/workflows/js-test-and-release.yml?query=branch%3Amaster)

> A set of utilities to help identify IPFS resources on the web

# About

A suite of util methods that provides efficient validation.

Detection of IPFS Paths and identifiers in URLs is a two-stage process:

1. `pathPattern`/`pathGatewayPattern`/`subdomainGatewayPattern` regex is applied to quickly identify potential candidates
2. proper CID validation is applied to remove false-positives

## Example

```TypeScript
import * as isIPFS from 'is-ipfs'

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

# Install

```console
$ npm i is-ipfs
```

## Browser `<script>` tag

Loading this module through a script tag will make it's exports available as `IsIpfs` in the global namespace.

```html
<script src="https://unpkg.com/is-ipfs/dist/index.min.js"></script>
```

# API Docs

- <https://ipfs-shipyard.github.io/is-ipfs>

# License

Licensed under either of

- Apache 2.0, ([LICENSE-APACHE](LICENSE-APACHE) / <http://www.apache.org/licenses/LICENSE-2.0>)
- MIT ([LICENSE-MIT](LICENSE-MIT) / <http://opensource.org/licenses/MIT>)

# Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.
