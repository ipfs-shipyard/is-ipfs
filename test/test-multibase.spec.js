/* eslint-env mocha */
'use strict'

const base58btc = require('bs58')
const expect = require('chai').expect
const isIPFS = require('../src/index')

describe('ipfs base32cid', () => {
  it('isIPFS.base32cid should not match a valid CIDv0 (multihash in base58btc)', (done) => {
    const actual = isIPFS.base32cid('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.base32cid should not match a valid CIDv1 in base58btc', (done) => {
    const actual = isIPFS.cid('zdj7WWeQ43G6JJvLWQWZpyHuAMq6uYWRjkBXFad11vE2LHhQ7')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.base32cid should match a valid URL-safe CIDv1 in Base32', (done) => {
    const actual = isIPFS.base32cid('bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.base32cid should not match an invalid CID (with a typo)', (done) => {
    const actual = isIPFS.base32cid('afybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va')
    expect(actual).to.equal(false)
    done()
  })


  it('isIPFS.base32cid should not match an invalid CID', (done) => {
    const actual = isIPFS.base32cid('noop')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.base32cid should not match an invalid CID data type', (done) => {
    const actual = isIPFS.base32cid(4)
    expect(actual).to.equal(false)
    done()
  })

})

describe('ipfs multibase', () => {
  it('isIPFS.multibase should return false for a valid CIDv0 (raw multihash in base58btc, nor multibase prefix)', (done) => {
    const actual = isIPFS.multibase('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.multibase should match a valid CIDv1 in base58btc', (done) => {
    const actual = isIPFS.multibase('zdj7WWeQ43G6JJvLWQWZpyHuAMq6uYWRjkBXFad11vE2LHhQ7')
    expect(actual).to.equal('base58btc')
    done()
  })

  it('isIPFS.multibase should match CIDv1 in Base32', (done) => {
    const actual = isIPFS.multibase('bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va')
    expect(actual).to.equal('base32')
    done()
  })

  it('isIPFS.multibase should not match an invalid CID (with a typo)', (done) => {
    const actual = isIPFS.multibase('afybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va')
    expect(actual).to.equal(false)
    done()
  })

})
