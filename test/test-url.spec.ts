/* eslint-env mocha */

import { expect } from 'aegir/chai'
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
import * as isIPFS from '../src/index.js'

describe('ipfs url', () => {
  it('isIPFS.ipfsUrl should match an ipfs url', (done) => {
    const actual = isIPFS.ipfsUrl('http://ipfs.io/ipfs/QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm?arg=val#hash')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.ipfsUrl should match a complex ipfs url', (done) => {
    const actual = isIPFS.ipfsUrl('http://ipfs.alexandria.media/ipfs/QmeWz9YZEeNFXQhHg4PnR5ZiNr5isttgi5n1tc1eD5EfGU/content/index.html?arg=val#hash')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.ipfsUrl should not match an ipns url', (done) => {
    const actual = isIPFS.ipfsUrl('http://ipfs.io/ipns/github.com/')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.ipfsUrl should not match a github ipfs repo url', (done) => {
    const actual = isIPFS.ipfsUrl('https://github.com/ipfs/js-ipfs/blob/master/README.md')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.ipfsUrl should not match an google url', (done) => {
    const actual = isIPFS.ipfsUrl('https://google.com')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.ipfsUrl should not match a Uint8Array input', (done) => {
    const actual = isIPFS.ipfsUrl(uint8ArrayFromString('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o', 'base58btc'))
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.ipnsUrl should not match an ipfs url', (done) => {
    const actual = isIPFS.ipnsUrl('http://ipfs.io/ipfs/QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.ipnsUrl should match an ipns url', (done) => {
    const actual = isIPFS.ipnsUrl('http://ipfs.io/ipns/github.com/')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.ipnsUrl should not match a github ipfs repo url', (done) => {
    const actual = isIPFS.ipnsUrl('https://github.com/ipfs/js-ipfs/blob/master/README.md')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.ipnsUrl should not match an google url', (done) => {
    const actual = isIPFS.ipnsUrl('https://google.com')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.ipnsUrl should not match a Uint8Array input', (done) => {
    const actual = isIPFS.ipnsUrl(uint8ArrayFromString('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o', 'base58btc'))
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.url should match an ipfs url', (done) => {
    const actual = isIPFS.url('http://ipfs.io/ipfs/QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.url should match an ipns url', (done) => {
    const actual = isIPFS.url('http://ipfs.io/ipns/github.com/')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.url should not match a github ipfs repo url', (done) => {
    const actual = isIPFS.url('https://github.com/ipfs/js-ipfs/blob/master/README.md')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.url should not match an google url', (done) => {
    const actual = isIPFS.url('https://google.com')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.url should not match a Uint8Array input', (done) => {
    const actual = isIPFS.url(uint8ArrayFromString('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o', 'base58btc'))
    expect(actual).to.equal(false)
    done()
  })
})
