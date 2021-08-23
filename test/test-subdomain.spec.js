/* eslint-env mocha */
'use strict'

const isIPFS = require('../src/index')
const { expect } = require('aegir/utils/chai')
const { fromString: uint8ArrayFromString } = require('uint8arrays/from-string')

describe('ipfs subdomain', () => {
  it('isIPFS.ipfsSubdomain should match a cidv1b32', (done) => {
    const actual = isIPFS.ipfsSubdomain('http://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.ipfsSubdomain should match a cidv1b32 with complex ipfs path', (done) => {
    const actual = isIPFS.ipfsSubdomain('http://bafybeidvtwx54qr44kidymvhfzefzxhgkieigwth6oswk75zhlzjdmunoy.ipfs.dweb.link/linkify-demo.html')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.ipfsSubdomain should match localhost with port', (done) => {
    const actual = isIPFS.ipfsSubdomain('http://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.localhost:8080')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.ipfsSubdomain should not match non-cid subdomains', (done) => {
    const actual = isIPFS.ipfsSubdomain('http://not-a-cid.ipfs.dweb.link')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.ipfsSubdomain should not match case-sensitive CID subdomains', (done) => {
    // Origin forces browsers to lowercase the authority component
    // so QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR
    // becomes invalid CID: qmbwqxbekc3p8tqskc98xmwnzrzdtrlmimpl8wbutgsmnr
    const actual = isIPFS.ipfsSubdomain('http://QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR.ipfs.dweb.link')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.ipfsSubdomain should not match if not under .ipfs. zone', (done) => {
    // we require explicit convention of putting cidv1b32 under .ipfs. zone
    // to make it clear content can be safely uplifted and loaded over IPFS
    const actual = isIPFS.ipfsSubdomain('http://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.dweb.link')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.ipfsSubdomain should not match a Uint8Array data type', (done) => {
    const actual = isIPFS.ipfsSubdomain(uint8ArrayFromString('QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', 'base58btc'))
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.ipnsSubdomain should not match .ipfs. zone', (done) => {
    const actual = isIPFS.ipnsSubdomain('http://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.ipnsSubdomain should match a .ipns. zone with cidv1b32', (done) => {
    const actual = isIPFS.ipnsSubdomain('http://bafybeiabc2xofh6tdi6vutusorpumwcikw3hf3st4ecjugo6j52f6xwc6q.ipns.dweb.link')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.ipnsSubdomain should not match case-sensitive CID subdomains', (done) => {
    // Origin forces browsers to lowercase the authority component
    // so QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR
    // becomes invalid CID: qmbwqxbekc3p8tqskc98xmwnzrzdtrlmimpl8wbutgsmnr
    const actual = isIPFS.ipnsSubdomain('http://QmcNioXSC1bfJj1dcFErhUfyjFzoX2HodkRccsFFVJJvg8.ipns.dweb.link')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.ipnsSubdomain should not match without .ipns. zone', (done) => {
    const actual = isIPFS.ipnsSubdomain('http://bafybeiabc2xofh6tdi6vutusorpumwcikw3hf3st4ecjugo6j52f6xwc6q.dweb.link')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.ipnsSubdomain should not match a Uint8Array data type', (done) => {
    const actual = isIPFS.ipnsSubdomain(uint8ArrayFromString('QmNQuBJ8tg4QN6mSLXHekxBbcToPwKxamWNrDdEugxMTDd', 'base58btc'))
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.ipnsSubdomain should match .ipns.localhost zone with FQDN', (done) => {
    const actual = isIPFS.ipnsSubdomain('http://docs.ipfs.io.ipns.localhost:8080/some/path')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.ipnsSubdomain should match .ipns.sub.sub.domain.tld zone with FQDN', (done) => {
    const actual = isIPFS.ipnsSubdomain('http://docs.ipfs.io.ipns.foo.bar.buzz.dweb.link')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.ipnsSubdomain should match *.ipns. zone with FQDN', (done) => {
    const actual = isIPFS.ipnsSubdomain('http://docs.ipfs.io.ipns.locahost:8080')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.ipnsSubdomain should match .ipns. zone with cidv1b32', (done) => {
    const actual = isIPFS.ipnsSubdomain('http://bafybeiabc2xofh6tdi6vutusorpumwcikw3hf3st4ecjugo6j52f6xwc6q.ipns.dweb.link')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.ipnsSubdomain should not match if *.ipns is not a valid hostname', (done) => {
    const actual = isIPFS.ipnsSubdomain('http://invalid-hostname-.ipns.dweb.link')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.ipnsSubdomain should match if *.ipns is FQDN inlined into a single DNS label', (done) => {
    const actual = isIPFS.ipnsSubdomain('https://en-wikipedia--on--ipfs-org.ipns.dweb.link')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.subdomain should match an ipfs subdomain', (done) => {
    const actual = isIPFS.subdomain('http://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.subdomain should match an ipns subdomain with PeerID as cidv1b32', (done) => {
    const actual = isIPFS.subdomain('http://bafybeiabc2xofh6tdi6vutusorpumwcikw3hf3st4ecjugo6j52f6xwc6q.ipns.dweb.link')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.subdomain should match .ipns.localhost zone with FQDN', (done) => {
    // we do not support opaque strings in subdomains, only  peerids
    const actual = isIPFS.subdomain('http://docs.ipfs.io.ipns.dweb.link')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.subdomain should not match if fqdn does not start with cidv1b32', (done) => {
    const actual = isIPFS.subdomain('http://www.bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.subdomain should not match if no ipfs/ipns zone', (done) => {
    const actual = isIPFS.subdomain('http://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.dweb.link')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.subdomain should not match if *.ipns is not libp2pkey nor fqdn', (done) => {
    const actual = isIPFS.subdomain('http://not-a-cid-or-valid-hostname-.ipns.dweb.link')
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.subdomain should match if *.ipns looks like an inlined DNSLink name', (done) => {
    const actual = isIPFS.subdomain('http://en-wikipedia--on--ipfs-org.ipns.dweb.link')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.subdomain should not match a Uint8Array data type', (done) => {
    const actual = isIPFS.subdomain(uint8ArrayFromString('QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', 'base58btc'))
    expect(actual).to.equal(false)
    done()
  })

  it('isIPFS.urlOrPath should match ipfs url with cidv1b32 subdomain', (done) => {
    const actual = isIPFS.urlOrPath('http://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.urlOrPath should match subdomain ipns', (done) => {
    const actual = isIPFS.urlOrPath('http://bafybeiabc2xofh6tdi6vutusorpumwcikw3hf3st4ecjugo6j52f6xwc6q.ipns.dweb.link')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.urlOrPath should match potential DNSLink in subdomain', (done) => {
    const actual = isIPFS.urlOrPath('http://a-dnslink-website.com.ipns.localhost:8080')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.url should match ipfs url with cidv1b32 subdomain', (done) => {
    const actual = isIPFS.url('http://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.url should match subdomain ipns', (done) => {
    const actual = isIPFS.url('http://bafybeiabc2xofh6tdi6vutusorpumwcikw3hf3st4ecjugo6j52f6xwc6q.ipns.dweb.link')
    expect(actual).to.equal(true)
    done()
  })

  it('isIPFS.url should match potential DNSLink in subdomain', (done) => {
    const actual = isIPFS.url('http://a-dnslink-website.com.ipns.localhost:8080')
    expect(actual).to.equal(true)
    done()
  })
})
