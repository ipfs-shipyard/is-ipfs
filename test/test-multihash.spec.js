/* eslint-env mocha */
'use strict'

const base58 = require('bs58')
const expect = require('chai').expect
const isIPFS = require('../src/index')

describe('ipfs multihash', () => {
  it('isIPFS.multihash should match a valid multihash', (done) => {
    const actual = isIPFS.multihash('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.multihash should match a valid multihash buffer', (done) => {
    const actual = isIPFS.multihash(Buffer.from(base58.decode('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o')))
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.multihash should not match a buffer', (done) => {
    const actual = isIPFS.multihash(Buffer.from('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE70'))
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.multihash should not match an invalid multihash (with a typo)', (done) => {
    const actual = isIPFS.multihash('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE70')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.multihash should not match an invalid multihash', (done) => {
    const actual = isIPFS.multihash('noop')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.multihash should not match an invalid multihash data type', (done) => {
    const actual = isIPFS.multihash(4)
    expect(actual).to.equal(false)
    done()
  })
})
