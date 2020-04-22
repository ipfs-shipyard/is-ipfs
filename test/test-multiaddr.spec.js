/* eslint-env mocha */
'use strict'

const { Buffer } = require('buffer')
const expect = require('chai').expect
const Multiaddr = require('multiaddr')
const isIPFS = require('../src/index')

describe('ipfs multiaddr', () => {
  it('isIPFS.multiaddr should match a string with valid ip4 multiaddr', (done) => {
    const actual = isIPFS.multiaddr('/ip4/127.0.0.1/udp/1234/http')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.multiaddr should match a string with valid ip6 multiaddr', (done) => {
    const actual = isIPFS.multiaddr('/ip6/::1/udp/1234/http')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.multiaddr should match a valid Multiaddr instance', (done) => {
    const ma = new Multiaddr('/ip6/::1/udp/1234/http')
    const actual = isIPFS.multiaddr(ma)
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.multiaddr should match a Buffer with multiaddr', (done) => {
    const ma = new Multiaddr('/ip6/::1/udp/1234/http')
    const actual = isIPFS.multiaddr(Buffer.from(ma.buffer))
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.multiaddr should not match random Buffer', (done) => {
    const actual = isIPFS.multiaddr(Buffer.from('randombuffer'))
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.multiaddr should not match an invalid multiaddr (no initial slash)', (done) => {
    const actual = isIPFS.multiaddr('ip4/127.0.0.1/udp/1234/http')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.multiaddr should not match an invalid multiaddr (unknown namespace)', (done) => {
    const actual = isIPFS.multiaddr('/yoloinvalid/127.0.0.1/udp/1234/http')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.multiaddr should not match an invalid multiaddr', (done) => {
    const actual = isIPFS.multiaddr('noop')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.multiaddr should not match an invalid multiaddr data type', (done) => {
    const actual = isIPFS.multiaddr(4)
    expect(actual).to.equal(false)
    done()
  })
})

describe('ipfs peerMultiaddr', () => {
  // https://github.com/multiformats/js-mafmt/blob/v6.0.6/test/index.spec.js#L137
  const goodCircuit = [
    '/p2p-circuit',
    '/p2p-circuit/ipfs/QmUjNmr8TgJCn1Ao7DvMy4cjoZU15b9bwSCBLE3vwXiwgj', // /ipfs/ is legacy notation replaced with /p2p/
    '/p2p-circuit/p2p/QmUjNmr8TgJCn1Ao7DvMy4cjoZU15b9bwSCBLE3vwXiwgj',
    '/p2p-circuit/ip4/127.0.0.1/tcp/20008/ws/ipfs/QmUjNmr8TgJCn1Ao7DvMy4cjoZU15b9bwSCBLE3vwXiwgj',
    '/p2p-circuit/ip4/127.0.0.1/tcp/20008/ws/p2p/QmUjNmr8TgJCn1Ao7DvMy4cjoZU15b9bwSCBLE3vwXiwgj',
    '/p2p-circuit/ip4/1.2.3.4/tcp/3456/ws/p2p-webrtc-star/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4',
    '/p2p-circuit/ip4/1.2.3.4/tcp/3456/ws/p2p-webrtc-star/p2p/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4',
    '/p2p-circuit/ip4/1.2.3.4/tcp/3456/p2p/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4',
    '/p2p-circuit/ip4/1.2.3.4/tcp/3456/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4',
    '/p2p-circuit/ip4/127.0.0.1/tcp/4002/ipfs/QmddWMcQX6orJGHpETYMyPgXrCXCtYANMFVDCvhKoDwLqA',
    '/p2p-circuit/ipfs/QmddWMcQX6orJGHpETYMyPgXrCXCtYANMFVDCvhKoDwLqA',
    '/p2p-circuit/p2p/QmddWMcQX6orJGHpETYMyPgXrCXCtYANMFVDCvhKoDwLqA',
    '/p2p-circuit/ip4/127.0.0.1/tcp/20008/ws/ipfs/QmUjNmr8TgJCn1Ao7DvMy4cjoZU15b9bwSCBLE3vwXiwgj/' +
    'p2p-circuit/ipfs/QmUjNmr8TgJCn1Ao7DvMy4cjoZU15b9bwSCBLE3vwXiwgj'
  ]
  // https://github.com/multiformats/js-mafmt/blob/v6.0.6/test/index.spec.js#L157
  const validPeerMultiaddrs = [
    '/ip4/127.0.0.1/tcp/20008/ws/ipfs/QmUjNmr8TgJCn1Ao7DvMy4cjoZU15b9bwSCBLE3vwXiwgj',
    '/ip4/127.0.0.1/tcp/20008/ws/p2p/QmUjNmr8TgJCn1Ao7DvMy4cjoZU15b9bwSCBLE3vwXiwgj',
    '/ip4/127.0.0.1/tcp/20008/ws/p2p/12D3KooWFB51PRY9BxcXSH6khFXw1BZeszeLDy7C8GciskqCTZn5', // ed25519+identity multihash
    '/ip4/1.2.3.4/tcp/3456/ws/p2p-webrtc-star/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4',
    '/ip4/1.2.3.4/tcp/3456/ws/p2p-webrtc-star/p2p/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4',
    '/ip4/1.2.3.4/tcp/3456/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4',
    '/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4/p2p-circuit',
    '/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4/p2p-circuit/ipfs/QmUjNmr8TgJCn1Ao7DvMy4cjoZU15b9bwSCBLE3vwXiwgj'
  ].concat(goodCircuit)

  it('isIPFS.peerMultiaddr should match a string with a valid IPFS peer', (done) => {
    for (const addr of validPeerMultiaddrs) {
      const actual = isIPFS.peerMultiaddr(addr)
      expect(actual, `isIPFS.peerMultiaddr(${addr})`).to.equal(true)
    }
    done()
  })

  it('isIPFS.peerMultiaddr should match a valid Multiaddr instance', (done) => {
    for (const addr of validPeerMultiaddrs) {
      const ma = new Multiaddr(addr)
      const actual = isIPFS.peerMultiaddr(ma)
      expect(actual, `isIPFS.peerMultiaddr(${addr})`).to.equal(true)
    }
    done()
  })

  it('isIPFS.peerMultiaddr should match a Buffer with multiaddr', (done) => {
    for (const addr of validPeerMultiaddrs) {
      const ma = new Multiaddr(addr)
      const actual = isIPFS.peerMultiaddr((Buffer.from(ma.buffer)))
      expect(actual, `isIPFS.peerMultiaddr(${addr})`).to.equal(true)
    }
    done()
  })

  it('isIPFS.peerMultiaddr should not match random Buffer', (done) => {
    const actual = isIPFS.peerMultiaddr(Buffer.from('randombuffer'))
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.peerMultiaddr should not match an invalid multiaddr (no initial slash)', (done) => {
    const actual = isIPFS.peerMultiaddr('ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.peerMultiaddr should not match an invalid multiaddr (unknown namespace)', (done) => {
    const actual = isIPFS.peerMultiaddr('/yoloinvalid/1.2.3.4/tcp/3456/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.peerMultiaddr should not match an invalid multiaddr', (done) => {
    const actual = isIPFS.peerMultiaddr('noop')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.peerMultiaddr should not match an invalid multiaddr data type', (done) => {
    const actual = isIPFS.peerMultiaddr(4)
    expect(actual).to.equal(false)
    done()
  })
})
