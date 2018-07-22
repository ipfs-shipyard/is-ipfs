/* eslint-env mocha */
'use strict'

const base58 = require('bs58')
const expect = require('chai').expect
const isIPFS = require('../src/index')

describe('ipfs cid', () => {
  it('isIPFS.cid should match a valid CIDv0 (multihash)', (done) => {
    const actual = isIPFS.cid('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.cid should match a valid CIDv0 (multihash) buffer', (done) => {
    const actual = isIPFS.cid(Buffer.from(base58.decode('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o')))
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.cid should not match a broken CIDv0 buffer', (done) => {
    const actual = isIPFS.cid(Buffer.from('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE70'))
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.cid should not match an invalid CIDv0 (multihash with a typo)', (done) => {
    const actual = isIPFS.cid('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE70')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.cid should match a valid CIDv1', (done) => {
    const actual = isIPFS.cid('zdj7WWeQ43G6JJvLWQWZpyHuAMq6uYWRjkBXFad11vE2LHhQ7')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.cid should match a valid CIDv1 in Base32', (done) => {
    const actual = isIPFS.cid('bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.cid should not match an invalid CIDv1 (with a typo)', (done) => {
    const actual = isIPFS.cid('zdj7WWeQ43G6JJvLWQWZpyHuAMq6uYWRjkBXFad11vE2LHhQ')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.cid should not match an invalid CID', (done) => {
    const actual = isIPFS.cid('noop')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.cid should not match an invalid CID data type', (done) => {
    const actual = isIPFS.cid(4)
    expect(actual).to.equal(false)
    done()
  })
})
