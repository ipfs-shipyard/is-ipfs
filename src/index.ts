import { base58btc } from 'multiformats/bases/base58'
import { base32 } from 'multiformats/bases/base32'
import * as Digest from 'multiformats/hashes/digest'
import { multiaddr } from '@multiformats/multiaddr'
import type { Multiaddr } from '@multiformats/multiaddr'
import * as mafmt from '@multiformats/mafmt'
import { CID } from 'multiformats/cid'
import { URL } from 'iso-url'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'

export const pathGatewayPattern = /^https?:\/\/[^/]+\/(ip[fn]s)\/([^/?#]+)/
export const pathPattern = /^\/(ip[fn]s)\/([^/?#]+)/
const defaultProtocolMatch = 1
const defaultHashMath = 2

// CID, libp2p-key or DNSLink
export const subdomainGatewayPattern = /^https?:\/\/([^/]+)\.(ip[fn]s)\.[^/?]+/
const subdomainIdMatch = 1
const subdomainProtocolMatch = 2

// Fully qualified domain name (FQDN) that has an explicit .tld suffix
const fqdnWithTld = /^(([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])\.)+([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])$/

function isMultihash (hash: Uint8Array | string): boolean {
  const formatted = convertToString(hash)

  if (formatted === false) {
    return false
  }

  try {
    Digest.decode(base58btc.decode('z' + formatted))
  } catch {
    return false
  }

  return true
}

function isMultiaddr (input: string | Uint8Array | Multiaddr): input is Multiaddr {
  try {
    return Boolean(multiaddr(input))
  } catch {
    return false
  }
}

function isBase32EncodedMultibase (hash: CID | string | Uint8Array): boolean {
  try {
    let cid: CID | null

    if (isString(hash)) {
      cid = CID.parse(hash)
    } else {
      cid = CID.asCID(hash)
    }

    if (cid == null) {
      return false
    }

    base32.decode(cid.toString())
  } catch {
    return false
  }

  return true
}

function isCID (hash: CID | Uint8Array | string): hash is CID {
  try {
    if (isString(hash)) {
      return Boolean(CID.parse(hash))
    }

    if (hash instanceof Uint8Array) {
      return Boolean(CID.decode(hash))
    }

    return Boolean(CID.asCID(hash)) // eslint-disable-line no-new
  } catch {
    return false
  }
}

/**
 * @param {string | Uint8Array | Multiaddr} input
 */
function isPeerMultiaddr (input: string | Uint8Array | Multiaddr): boolean {
  return isMultiaddr(input) && mafmt.P2P.matches(input)
}

/**
 * @param {string | Uint8Array} input
 * @param {RegExp | string} pattern
 * @param {number} [protocolMatch=1]
 * @param {number} [hashMatch=2]
 */
function isIpfs (input: string | Uint8Array, pattern: RegExp | string, protocolMatch: number = defaultProtocolMatch, hashMatch: number = defaultHashMath) {
  const formatted = convertToString(input)
  if (formatted === false) {
    return false
  }

  const match = formatted.match(pattern)
  if (match == null) {
    return false
  }

  if (match[protocolMatch] !== 'ipfs') {
    return false
  }

  let hash = match[hashMatch]

  if (hash != null && pattern === subdomainGatewayPattern) {
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
function isIpns (input: string | Uint8Array, pattern: RegExp | string, protocolMatch: number = defaultProtocolMatch, hashMatch: number = defaultHashMath) {
  const formatted = convertToString(input)
  if (formatted === false) {
    return false
  }
  const match = formatted.match(pattern)
  if (match == null) {
    return false
  }

  if (match[protocolMatch] !== 'ipns') {
    return false
  }

  let ipnsId = match[hashMatch]

  if (ipnsId != null && pattern === subdomainGatewayPattern) {
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
function isString (input: any): input is string {
  return typeof input === 'string'
}

/**
 * @param {Uint8Array | string} input
 */
function convertToString (input: Uint8Array | string) {
  if (input instanceof Uint8Array) {
    return uint8ArrayToString(input, 'base58btc')
  }

  if (isString(input)) {
    return input
  }

  return false
}

export const ipfsSubdomain = (url: string | Uint8Array) => isIpfs(url, subdomainGatewayPattern, subdomainProtocolMatch, subdomainIdMatch)
export const ipnsSubdomain = (url: string | Uint8Array) => isIpns(url, subdomainGatewayPattern, subdomainProtocolMatch, subdomainIdMatch)
export const subdomain = (url: string | Uint8Array) => ipfsSubdomain(url) || ipnsSubdomain(url)
export const ipfsUrl = (url: string | Uint8Array) => isIpfs(url, pathGatewayPattern) || ipfsSubdomain(url)
export const ipnsUrl = (url: string | Uint8Array) => isIpns(url, pathGatewayPattern) || ipnsSubdomain(url)
export const url = (url: string | Uint8Array) => ipfsUrl(url) || ipnsUrl(url) || subdomain(url)
export const path = (path: string | Uint8Array) => isIpfs(path, pathPattern) || isIpns(path, pathPattern)

export { isMultihash as multihash }
export { isMultiaddr as multiaddr }
export { isPeerMultiaddr as peerMultiaddr }
export { isCID as cid }

export const base32cid = (cid: CID | string | Uint8Array) => (isCID(cid) && isBase32EncodedMultibase(cid))
export const ipfsPath = (path: string | Uint8Array) => isIpfs(path, pathPattern)
export const ipnsPath = (path: string | Uint8Array) => isIpns(path, pathPattern)
export const urlOrPath = (x: string | Uint8Array) => url(x) || path(x)
export const cidPath = (path: string | Uint8Array | CID) => isString(path) && !isCID(path) && isIpfs(`/ipfs/${path}`, pathPattern)
