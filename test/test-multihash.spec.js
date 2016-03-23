/* eslint-env mocha */
/* eslint strict: [2, "global"] */
'use strict'
const expect = require('chai').expect
const isIPFS = require('../src/index')

describe('ipfs multihash', () => {
  it('isIPFS.multihash should match a valid multihash', (done) => {
    const actual = isIPFS.multihash('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o')
    expect(actual).to.equal(true)
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
