'use strict'

const { base58btc } = require('multiformats/bases/base58')
const { base32 } = require('multiformats/bases/base32')
const Digest = require('multiformats/hashes/digest')
const { Multiaddr } = require('multiaddr')
const mafmt = require('mafmt')
const { CID } = require('multiformats/cid')
const { URL } = require('iso-url')
const { toString: uint8ArrayToString } = require('uint8arrays/to-string')

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

/**
 * @param {*} hash
 */
function isMultihash (hash) {
  const formatted = convertToString(hash)
  try {
    Digest.decode(base58btc.decode('z' + formatted))
  } catch {
    return false
  }

  return true
}

/**
 * @param {*} hash
 */
function isBase32EncodedMultibase (hash) {
  try {
    base32.decode(hash)
  } catch {
    return false
  }

  return true
}

/**
 * @param {*} hash
 */
function isCID (hash) {
  try {
    if (typeof hash === 'string') {
      return Boolean(CID.parse(hash))
    }

    if (hash instanceof Uint8Array) {
      return Boolean(CID.decode(hash))
    }

    return Boolean(CID.asCID(hash)) // eslint-disable-line no-new
  } catch (e) {
    return false
  }
}

/**
 * @param {*} input
 */
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

/**
 * @param {string | Uint8Array | Multiaddr} input
 */
function isPeerMultiaddr (input) {
  return isMultiaddr(input) && mafmt.P2P.matches(input)
}

/**
 * @param {string | Uint8Array} input
 * @param {RegExp | string} pattern
 * @param {number} [protocolMatch=1]
 * @param {number} [hashMatch=2]
 */
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
    // (browsers force-lowercase authority component anyway)
    hash = hash.toLowerCase()
  }

  return isCID(hash)
}

/**
 *
 * @param {string | Uint8Array} input
 * @param {string | RegExp} pattern
 * @param {number} [protocolMatch=1]
 * @param {number} [hashMatch=1]
 */
function isIpns (input, pattern, protocolMatch = defaultProtocolMatch, hashMatch = defaultHashMath) {
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
      if (!ipnsId.includes('.') && ipnsId.includes('-')) {
        // name without tld, assuming its inlined into a single DNS label
        // (https://github.com/ipfs/in-web-browsers/issues/169)
        // en-wikipedia--on--ipfs-org → en.wikipedia-on-ipfs.org
        ipnsId = ipnsId.replace(/--/g, '@').replace(/-/g, '.').replace(/@/g, '-')
      }
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

/**
 * @param {any} input
 */
function isString (input) {
  return typeof input === 'string'
}

/**
 * @param {Uint8Array | string} input
 */
function convertToString (input) {
  if (input instanceof Uint8Array) {
    return uint8ArrayToString(input, 'base58btc')
  }

  if (isString(input)) {
    return input
  }

  return false
}

/**
 * @param {string | Uint8Array} url
 */
const ipfsSubdomain = (url) => isIpfs(url, subdomainGatewayPattern, subdomainProtocolMatch, subdomainIdMatch)
/**
 * @param {string | Uint8Array} url
 */
const ipnsSubdomain = (url) => isIpns(url, subdomainGatewayPattern, subdomainProtocolMatch, subdomainIdMatch)
/**
 * @param {string | Uint8Array} url
 */
const subdomain = (url) => ipfsSubdomain(url) || ipnsSubdomain(url)

/**
 * @param {string | Uint8Array} url
 */
const ipfsUrl = (url) => isIpfs(url, pathGatewayPattern) || ipfsSubdomain(url)
/**
 * @param {string | Uint8Array} url
 */
const ipnsUrl = (url) => isIpns(url, pathGatewayPattern) || ipnsSubdomain(url)
/**
 * @param {string | Uint8Array} url
 */
const url = (url) => ipfsUrl(url) || ipnsUrl(url) || subdomain(url)

/**
 * @param {string | Uint8Array} path
 */
const path = (path) => isIpfs(path, pathPattern) || isIpns(path, pathPattern)

module.exports = {
  multihash: isMultihash,
  multiaddr: isMultiaddr,
  peerMultiaddr: isPeerMultiaddr,
  cid: isCID,
  /**
   * @param {CID | string | Uint8Array} cid
   */
  base32cid: (cid) => (isBase32EncodedMultibase(cid) && isCID(cid)),
  ipfsSubdomain,
  ipnsSubdomain,
  subdomain,
  subdomainGatewayPattern,
  ipfsUrl,
  ipnsUrl,
  url,
  pathGatewayPattern: pathGatewayPattern,
  /**
   * @param {string | Uint8Array} path
   */
  ipfsPath: (path) => isIpfs(path, pathPattern),
  /**
   * @param {string | Uint8Array} path
   */
  ipnsPath: (path) => isIpns(path, pathPattern),
  path,
  pathPattern,
  /**
   * @param {string | Uint8Array} x
   */
  urlOrPath: (x) => url(x) || path(x),
  /**
   * @param {string | Uint8Array | CID} path
   */
  cidPath: path => isString(path) && !isCID(path) && isIpfs(`/ipfs/${path}`, pathPattern)
}
