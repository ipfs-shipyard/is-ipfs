'use strict'

const multihash = require('multihashes')
const multibase = require('multibase')
const Multiaddr = require('multiaddr')
const mafmt = require('mafmt')
const CID = require('cids')
const { URL } = require('iso-url')
const uint8ArrayToString = require('uint8arrays/to-string')

const pathGatewayPattern = /^https?:\/\/[^/]+\/(ip[fn]s)\/([^/?#]+)/
const pathPattern = /^\/(ip[fn]s)\/([^/?#]+)/
const defaultProtocolMatch = 1
const defaultHashMath = 2

// CID, libp2p-key or DNSLink
const subdomainGatewayPattern = /^https?:\/\/([^/]+)\.(ip[fn]s)\.[^/?]+/
const subdomainIdMatch = 1
const subdomainProtocolMatch = 2

// Fully qualified domain name (FQDN) that has an explicit .tld suffix
const fqdnWithTld = /^(([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])\.)+([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])$/

function isMultihash (hash) {
  const formatted = convertToString(hash)
  try {
    multihash.decode(multibase.decode('z' + formatted))
    return true
  } catch (e) {
    return false
  }
}

function isMultibase (hash) {
  try {
    return multibase.isEncoded(hash)
  } catch (e) {
    return false
  }
}

function isCID (hash) {
  try {
    new CID(hash) // eslint-disable-line no-new
    return true
  } catch (e) {
    return false
  }
}

function isMultiaddr (input) {
  if (!input) return false
  if (Multiaddr.isMultiaddr(input)) return true
  try {
    new Multiaddr(input) // eslint-disable-line no-new
    return true
  } catch (e) {
    return false
  }
}

function isPeerMultiaddr (input) {
  return isMultiaddr(input) && mafmt.IPFS.matches(input)
}

function isIpfs (input, pattern, protocolMatch = defaultProtocolMatch, hashMatch = defaultHashMath) {
  const formatted = convertToString(input)
  if (!formatted) {
    return false
  }

  const match = formatted.match(pattern)
  if (!match) {
    return false
  }

  if (match[protocolMatch] !== 'ipfs') {
    return false
  }

  let hash = match[hashMatch]

  if (hash && pattern === subdomainGatewayPattern) {
    // when doing checks for subdomain context
    // ensure hash is case-insensitive
    // (browsers force-lowercase authority compotent anyway)
    hash = hash.toLowerCase()
  }

  return isCID(hash)
}

function isIpns (input, pattern, protocolMatch = defaultProtocolMatch, hashMatch) {
  const formatted = convertToString(input)
  if (!formatted) {
    return false
  }
  const match = formatted.match(pattern)
  if (!match) {
    return false
  }

  if (match[protocolMatch] !== 'ipns') {
    return false
  }

  let ipnsId = match[hashMatch]

  if (ipnsId && pattern === subdomainGatewayPattern) {
    // when doing checks for subdomain context
    // ensure ipnsId is case-insensitive
    // (browsers force-lowercase authority compotent anyway)
    ipnsId = ipnsId.toLowerCase()
    // Check if it is cidv1
    if (isCID(ipnsId)) return true
    // Check if it looks like FQDN
    try {
      // URL implementation in web browsers forces lowercase of the hostname
      const { hostname } = new URL(`http://${ipnsId}`) // eslint-disable-line no-new
      // Check if potential FQDN has an explicit TLD
      return fqdnWithTld.test(hostname)
    } catch (e) {
      return false
    }
  }

  return true
}

function isString (input) {
  return typeof input === 'string'
}

function convertToString (input) {
  if (input instanceof Uint8Array) {
    return uint8ArrayToString(input, 'base58btc')
  }

  if (isString(input)) {
    return input
  }

  return false
}

const ipfsSubdomain = (url) => isIpfs(url, subdomainGatewayPattern, subdomainProtocolMatch, subdomainIdMatch)
const ipnsSubdomain = (url) => isIpns(url, subdomainGatewayPattern, subdomainProtocolMatch, subdomainIdMatch)
const subdomain = (url) => ipfsSubdomain(url) || ipnsSubdomain(url)

const ipfsUrl = (url) => isIpfs(url, pathGatewayPattern) || ipfsSubdomain(url)
const ipnsUrl = (url) => isIpns(url, pathGatewayPattern) || ipnsSubdomain(url)
const url = (url) => ipfsUrl(url) || ipnsUrl(url) || subdomain(url)

const path = (path) => isIpfs(path, pathPattern) || isIpns(path, pathPattern)

module.exports = {
  multihash: isMultihash,
  multiaddr: isMultiaddr,
  peerMultiaddr: isPeerMultiaddr,
  cid: isCID,
  base32cid: (cid) => (isMultibase(cid) === 'base32' && isCID(cid)),
  ipfsSubdomain,
  ipnsSubdomain,
  subdomain,
  subdomainGatewayPattern,
  ipfsUrl,
  ipnsUrl,
  url,
  pathGatewayPattern: pathGatewayPattern,
  ipfsPath: (path) => isIpfs(path, pathPattern),
  ipnsPath: (path) => isIpns(path, pathPattern),
  path,
  pathPattern,
  urlOrPath: (x) => url(x) || path(x),
  cidPath: path => isString(path) && !isCID(path) && isIpfs(`/ipfs/${path}`, pathPattern)
}
