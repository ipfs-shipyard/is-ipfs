/* eslint-env mocha */

import { expect } from 'aegir/chai'
import { CID } from 'multiformats/cid'
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
import * as isIPFS from '../src/index.js'

describe('ipfs cid', () => {
  it('isIPFS.cid should match a valid CID instance', (done) => {
    const cid = CID.parse('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o')
    const actual = isIPFS.cid(cid)
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.cid should match a valid CIDv0 (multihash)', (done) => {
    const actual = isIPFS.cid('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.cid should match a valid CIDv0 (multihash) Uint8Array', (done) => {
    const actual = isIPFS.cid(uint8ArrayFromString('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o', 'base58btc'))
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.cid should not match a broken CIDv0 Uint8Array', (done) => {
    const actual = isIPFS.cid(uint8ArrayFromString('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE70'))
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.cid should not match an invalid CIDv0 (multihash with a typo)', (done) => {
    const actual = isIPFS.cid('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE70')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.cid should match a valid CIDv1 in Base58btc', (done) => {
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
    // @ts-expect-error invalid input
    const actual = isIPFS.cid(4)
    expect(actual).to.equal(false)
    done()
  })
})

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
    // @ts-expect-error data type is invalid
    const actual = isIPFS.base32cid(4)
    expect(actual).to.equal(false)
    done()
  })
})
