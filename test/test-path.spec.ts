/* eslint-env mocha */

import { expect } from 'aegir/chai'
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
import * as isIPFS from '../src/index.js'

describe('ipfs path', () => {
  it('isIPFS.ipfsPath should match an ipfs path', (done) => {
    const actual = isIPFS.ipfsPath('/ipfs/QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm?arg=val#hash')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.ipfsPath should match a complex ipfs path', (done) => {
    const actual = isIPFS.ipfsPath('/ipfs/QmeWz9YZEeNFXQhHg4PnR5ZiNr5isttgi5n1tc1eD5EfGU/content/index.html?arg=val#hash')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.ipfsPath should not match an ipns path', (done) => {
    const actual = isIPFS.ipfsPath('/ipns/github.com/')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.ipfsPath should not match a github ipfs repo href', (done) => {
    const actual = isIPFS.ipfsPath('/ipfs/js-ipfs/blob/master/README.md')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.ipfsPath should not match a path without prefix', (done) => {
    const actual = isIPFS.ipfsPath('/foo.bar')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.ipfsPath should not match a Uint8Array data type', (done) => {
    const actual = isIPFS.ipfsPath(uint8ArrayFromString('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o', 'base58btc'))
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.ipnsPath should not match an ipfs path', (done) => {
    const actual = isIPFS.ipnsPath('/ipfs/QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.ipnsPath should match an ipns path', (done) => {
    const actual = isIPFS.ipnsPath('/ipns/github.com/')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.ipnsPath should not match a github ipfs repo path', (done) => {
    const actual = isIPFS.ipnsPath('/ipfs/js-ipfs/blob/master/README.md')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.ipnsPath should not match a path without prefix', (done) => {
    const actual = isIPFS.ipnsPath('/foo.bar')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.ipnsPath should not match a Uint8Array data type', (done) => {
    const actual = isIPFS.ipnsPath(uint8ArrayFromString('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o', 'base58btc'))
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.path should match an ipfs path', (done) => {
    const actual = isIPFS.path('/ipfs/QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.path should match an ipns path', (done) => {
    const actual = isIPFS.path('/ipns/github.com/')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.path should not match a github ipfs repo path', (done) => {
    const actual = isIPFS.path('/ipfs/js-ipfs/blob/master/README.md')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.path should not match an path without prefix', (done) => {
    const actual = isIPFS.path('/foo.bar')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.path should not match a Uint8Array data type', (done) => {
    const actual = isIPFS.path(uint8ArrayFromString('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o', 'base58btc'))
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.urlOrPath should match ipfs url', (done) => {
    const actual = isIPFS.urlOrPath('http://ipfs.io/ipfs/QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.urlOrPath should match an IANA-schema compliant ipfs url', (done) => {
    const actual = isIPFS.urlOrPath('ipfs://QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.urlOrPath should match ipns url', (done) => {
    const actual = isIPFS.urlOrPath('http://ipfs.io/ipns/foo.bar.com')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.urlOrPath should match a path', (done) => {
    const actual = isIPFS.urlOrPath('/ipfs/QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.urlOrPath should match ipns path', (done) => {
    const actual = isIPFS.urlOrPath('/ipns/foo.bar.com')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.urlOrPath should not match a Uint8Array data type', (done) => {
    const actual = isIPFS.ipfsPath(uint8ArrayFromString('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o', 'base58btc'))
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.cidPath should match a CID path', () => {
    const actual = isIPFS.cidPath('QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm/path/to/file')
    expect(actual).to.equal(true)
  })

  it('isIPFS.cidPath should match a CID path with trailing slash', () => {
    const actual = isIPFS.cidPath('QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm/')
    expect(actual).to.equal(true)
  })

  it('isIPFS.cidPath should not match a CID', () => {
    const actual = isIPFS.cidPath('QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm')
    expect(actual).to.equal(false)
  })

  it('isIPFS.cidPath should not match a non string', () => {
    // @ts-expect-error data type is invalid
    const actual = isIPFS.cidPath({ toString: () => 'QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm/path/to/file' })
    expect(actual).to.equal(false)
  })

  it('isIPFS.cidPath should not match an IPFS path', () => {
    expect(isIPFS.cidPath('/ipfs/QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm')).to.be.false()
  })
})

describe('ipns path', () => {
  it('isIPFS.urlOrPath should match an IANA-schema compliant ipns url', () => {
    expect(isIPFS.urlOrPath('ipns://QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm')).to.be.true()
  })
})
