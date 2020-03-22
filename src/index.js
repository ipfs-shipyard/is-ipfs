'use strict'

const base58 = require('bs58')
const multihash = require('multihashes')
const multibase = require('multibase')
const Multiaddr = require('multiaddr')
const mafmt = require('mafmt')
const CID = require('cids')

const urlPattern = /^https?:\/\/[^/]+\/(ip[fn]s)\/([^/?#]+)/
const pathPattern = /^\/(ip[fn]s)\/([^/?#]+)/
const defaultProtocolMatch = 1
const defaultHashMath = 2

// CID, libp2p-key or DNSLink
const subdomainPattern = /^https?:\/\/([^/]+)\.(ip[fn]s)\.[^/?]+/
const subdomainIdMatch = 1
const subdomainProtocolMatch = 2

// Fully qualified domain name (FQDN) that has an explicit .tld suffix
const fqdnWithTld = /^(([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])\.)+([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])$/

function isMultihash (hash) {
  const formatted = convertToString(hash)
  try {
    const buffer = Buffer.from(base58.decode(formatted))
    multihash.decode(buffer)
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

  if (hash && pattern === subdomainPattern) {
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

  if (ipnsId && pattern === subdomainPattern) {
    // when doing checks for subdomain context
    // ensure hash is case-insensitive
    // (browsers force-lowercase authority compotent anyway)
    ipnsId = ipnsId.toLowerCase()
    return isCID(ipnsId)
  }

  return true
}

function isDNSLink (input, pattern, protocolMatch = defaultProtocolMatch, idMatch) {
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

  const fqdn = match[idMatch]

  if (fqdn && pattern === subdomainPattern) {
    try {
      // URL implementation in web browsers forces lowercase of the hostname
      const { hostname } = new URL(`http://${fqdn}`) // eslint-disable-line no-new
      // Confirm fqdn has an explicit TLD
      return fqdnWithTld.test(hostname)
    } catch (e) {
      return false
    }
  }
  return false
}

function isString (input) {
  return typeof input === 'string'
}

function convertToString (input) {
  if (Buffer.isBuffer(input)) {
    return base58.encode(input)
  }

  if (isString(input)) {
    return input
  }

  return false
}

const ipfsSubdomain = (url) => isIpfs(url, subdomainPattern, subdomainProtocolMatch, subdomainIdMatch)
const ipnsSubdomain = (url) => isIpns(url, subdomainPattern, subdomainProtocolMatch, subdomainIdMatch)
const dnslinkSubdomain = (url) => isDNSLink(url, subdomainPattern, subdomainProtocolMatch, subdomainIdMatch)

module.exports = {
  multihash: isMultihash,
  multiaddr: isMultiaddr,
  peerMultiaddr: isPeerMultiaddr,
  cid: isCID,
  base32cid: (cid) => (isMultibase(cid) === 'base32' && isCID(cid)),
  ipfsSubdomain,
  ipnsSubdomain,
  dnslinkSubdomain,
  subdomain: (url) => (ipfsSubdomain(url) || ipnsSubdomain(url) || dnslinkSubdomain(url)),
  subdomainPattern,
  ipfsUrl: (url) => isIpfs(url, urlPattern),
  ipnsUrl: (url) => isIpns(url, urlPattern),
  url: (url) => (isIpfs(url, urlPattern) || isIpns(url, urlPattern)),
  urlPattern: urlPattern,
  ipfsPath: (path) => isIpfs(path, pathPattern),
  ipnsPath: (path) => isIpns(path, pathPattern),
  path: (path) => (isIpfs(path, pathPattern) || isIpns(path, pathPattern)),
  pathPattern: pathPattern,
  urlOrPath: (x) => (isIpfs(x, urlPattern) || isIpns(x, urlPattern) || isIpfs(x, pathPattern) || isIpns(x, pathPattern)),
  cidPath: path => isString(path) && !isCID(path) && isIpfs(`/ipfs/${path}`, pathPattern)
}
