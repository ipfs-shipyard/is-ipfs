/* eslint-env mocha */
'use strict'

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
