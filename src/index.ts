/**
 * @packageDocumentation
 *
 * A suite of util methods that provides efficient validation.
 *
 * Detection of IPFS Paths and identifiers in URLs is a two-stage process:
 *
 * 1. `pathPattern`/`pathGatewayPattern`/`subdomainGatewayPattern` regex is applied to quickly identify potential candidates
 * 2. proper CID validation is applied to remove false-positives
 *
 * @example
 *
 * ```TypeScript
 * import * as isIPFS from 'is-ipfs'
 *
 * isIPFS.multihash('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true
 * isIPFS.multihash('noop') // false
 *
 * isIPFS.cid('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true (CIDv0)
 * isIPFS.cid('bafybeiasb5vpmaounyilfuxbd3lryvosl4yefqrfahsb2esg46q6tu6y5q') // true (CIDv1 in Base32)
 * isIPFS.cid('zdj7WWeQ43G6JJvLWQWZpyHuAMq6uYWRjkBXFad11vE2LHhQ7') // true (CIDv1 in Base58btc)
 * isIPFS.cid('noop') // false
 *
 * isIPFS.base32cid('bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va') // true
 * isIPFS.base32cid('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // false
 *
 * isIPFS.url('https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true
 * isIPFS.url('https://ipfs.io/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR?filename=guardian.jpg') // true
 * isIPFS.url('https://ipfs.io/ipns/github.com') // true
 * isIPFS.url('https://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link') // true
 * isIPFS.url('http://en.wikipedia-on-ipfs.org.ipfs.localhost:8080') // true
 * isIPFS.url('https://github.com/ipfs/js-ipfs/blob/master/README.md') // false
 * isIPFS.url('https://google.com') // false
 *
 * isIPFS.path('/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true
 * isIPFS.path('/ipfs/QmbcBPAwCDxRMB1Qe7CRQmxdrTSkxKwM9y6rZw2FjGtbsb/?weird-filename=test.jpg') // true
 * isIPFS.path('/ipns/github.com') // true
 * isIPFS.path('/ipfs/js-ipfs/blob/master/README.md') // false
 *
 * isIPFS.urlOrPath('https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true
 * isIPFS.urlOrPath('https://ipfs.io/ipns/github.com') // true
 * isIPFS.urlOrPath('/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true
 * isIPFS.urlOrPath('/ipns/github.com') // true
 * isIPFS.urlOrPath('https://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link') // true
 * isIPFS.urlOrPath('https://google.com') // false
 *
 * isIPFS.ipfsUrl('https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true
 * isIPFS.ipfsUrl('https://ipfs.io/ipfs/invalid-hash') // false
 *
 * isIPFS.ipnsUrl('https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // false
 * isIPFS.ipnsUrl('https://ipfs.io/ipns/github.com') // true
 *
 * isIPFS.ipfsPath('/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // true
 * isIPFS.ipfsPath('/ipfs/invalid-hash') // false
 *
 * isIPFS.ipnsPath('/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // false
 * isIPFS.ipnsPath('/ipns/github.com') // true
 *
 * isIPFS.cidPath('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o/path/to/file') // true
 * isIPFS.cidPath('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o/') // true
 * isIPFS.cidPath('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // false
 * isIPFS.cidPath('/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o') // false
 * isIPFS.cidPath('/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o/file') // false
 *
 * isIPFS.subdomain('http://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link') // true
 * isIPFS.subdomain('http://bafybeiabc2xofh6tdi6vutusorpumwcikw3hf3st4ecjugo6j52f6xwc6q.ipns.dweb.link') // true
 * isIPFS.subdomain('http://www.bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link') // false
 * isIPFS.subdomain('http://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.dweb.link') // false
 *
 * isIPFS.ipfsSubdomain('http://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link') // true
 * isIPFS.ipfsSubdomain('http://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.dweb.link') // false
 *
 * isIPFS.ipnsSubdomain('http://bafybeiabc2xofh6tdi6vutusorpumwcikw3hf3st4ecjugo6j52f6xwc6q.ipns.dweb.link') // true
 * isIPFS.ipnsSubdomain('http://bafybeiabc2xofh6tdi6vutusorpumwcikw3hf3st4ecjugo6j52f6xwc6q.dweb.link') // false
 * isIPFS.ipnsSubdomain('http://QmcNioXSC1bfJj1dcFErhUfyjFzoX2HodkRccsFFVJJvg8.ipns.dweb.link') // false
 * isIPFS.ipnsSubdomain('http://en.wikipedia-on-ipfs.org.ipns.localhost:8080') // true (assuming DNSLink)
 * isIPFS.ipnsSubdomain('http://en-wikipedia--on--ipfs-org.ipns.localhost:8080') // true (assuming inlined DNSLink)
 * isIPFS.ipnsSubdomain('http://hostname-without-tld-.ipns.dweb.link') // false (not a CID, invalid DNS label)
 *
 * isIPFS.multiaddr('/ip4/127.0.0.1/udp/1234') // true
 * isIPFS.multiaddr('/ip4/127.0.0.1/udp/1234/http') // true
 * isIPFS.multiaddr('/ip6/::1/udp/1234') // true
 * isIPFS.multiaddr('ip6/::1/udp/1234') // false
 * isIPFS.multiaddr('/yoloinvalid/::1/udp/1234') // false
 *
 * isIPFS.peerMultiaddr('/p2p/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4') // true
 * isIPFS.peerMultiaddr('/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4') // true (legacy notation)
 * isIPFS.peerMultiaddr('/ip4/127.0.0.1/tcp/1234/ws/p2p/QmUjNmr8TgJCn1Ao7DvMy4cjoZU15b9bwSCBLE3vwXiwgj') // true
 * isIPFS.peerMultiaddr('/p2p/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4/p2p-circuit/p2p/QmUjNmr8TgJCn1Ao7DvMy4cjoZU15b9bwSCBLE3vwXiwgj') // true
 * isIPFS.peerMultiaddr('/dnsaddr/bootstrap.libp2p.io') // false (key missing, needs additional DNS lookup to tell if this is valid)
 * isIPFS.peerMultiaddr('/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN') // true (key present, ip and port can be resolved later)
 * isIPFS.peerMultiaddr('/ip4/127.0.0.1/udp/1234') // false (key missing)
 * ```
 */

import * as mafmt from '@multiformats/mafmt'
import { multiaddr } from '@multiformats/multiaddr'
import { URL } from 'iso-url'
import { base32 } from 'multiformats/bases/base32'
import { base58btc } from 'multiformats/bases/base58'
import { CID } from 'multiformats/cid'
import * as Digest from 'multiformats/hashes/digest'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'
import type { Multiaddr } from '@multiformats/multiaddr'

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
    Digest.decode(base58btc.decode(`z${formatted}`))
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
function isIpfs (input: string | Uint8Array, pattern: RegExp | string, protocolMatch: number = defaultProtocolMatch, hashMatch: number = defaultHashMath): boolean {
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
function isIpns (input: string | Uint8Array, pattern: RegExp | string, protocolMatch: number = defaultProtocolMatch, hashMatch: number = defaultHashMath): boolean {
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
function convertToString (input: Uint8Array | string): string | false {
  if (input instanceof Uint8Array) {
    return uint8ArrayToString(input, 'base58btc')
  }

  if (isString(input)) {
    return input
  }

  return false
}

/**
 * Returns `true` if the provided `url` string includes a valid IPFS subdomain
 * (case-insensitive CIDv1) or `false` otherwise.
 */
export const ipfsSubdomain = (url: string | Uint8Array): boolean => isIpfs(url, subdomainGatewayPattern, subdomainProtocolMatch, subdomainIdMatch)

/**
 * Returns `true` if the provided `url` string looks like a valid IPNS subdomain
 * (CIDv1 with `libp2p-key` multicodec or something that looks like a FQDN, for
 * example `en.wikipedia-on-ipfs.org.ipns.localhost:8080`) or `false` otherwise.
 *
 * **Note:** `ipnsSubdomain` method works in offline mode: it does not perform
 * actual IPNS record lookup over DHT or other content routing method. It may
 * return false-positives:
 *
 * - To ensure IPNS record  exists, make a call to `/api/v0/name/resolve?arg=<ipnsid>`
 * - To ensure DNSLink exists, make a call to `/api/v0/dns?arg=<fqdn>`
 */
export const ipnsSubdomain = (url: string | Uint8Array): boolean => isIpns(url, subdomainGatewayPattern, subdomainProtocolMatch, subdomainIdMatch)

/**
 * Returns `true` if the provided `url` string includes a valid IPFS, looks like
 * an IPNS/DNSLink subdomain or `false` otherwise.
 */
export const subdomain = (url: string | Uint8Array): boolean => ipfsSubdomain(url) || ipnsSubdomain(url)

/**
 * Returns `true` if the provided string is a valid IPFS url or `false`
 * otherwise.
 */
export const ipfsUrl = (url: string | Uint8Array): boolean => isIpfs(url, pathGatewayPattern) || ipfsSubdomain(url)

/**
 * Returns `true` if the provided string is a valid IPNS url or `false`
 * otherwise.
 */
export const ipnsUrl = (url: string | Uint8Array): boolean => isIpns(url, pathGatewayPattern) || ipnsSubdomain(url)

/**
 * Returns `true` if the provided string is a valid IPFS or IPNS url or `false`
 * otherwise.
 */
export const url = (url: string | Uint8Array): boolean => ipfsUrl(url) || ipnsUrl(url) || subdomain(url)
export const path = (path: string | Uint8Array): boolean => isIpfs(path, pathPattern) || isIpns(path, pathPattern)

/**
 * Returns `true` if the provided string or `Uint8Array`  is a valid `multihash`
 * or `false` otherwise.
 */
export { isMultihash as multihash }

/**
 * Returns `true` if the provided `string`, [`Multiaddr`](https://github.com/multiformats/js-multiaddr)
 * or `Uint8Array` represents a valid multiaddr or `false` otherwise.
 */
export { isMultiaddr as multiaddr }

/**
 * Returns `true` if the provided `string`, [`Multiaddr`](https://github.com/multiformats/js-multiaddr)
 * or `Uint8Array` represents a valid libp2p peer multiaddr (matching [`P2P`
 * format from `mafmt`](https://github.com/multiformats/js-mafmt#api)) or
 * `false` otherwise.
 */
export { isPeerMultiaddr as peerMultiaddr }

/**
 * Returns `true` if the provided string, `Uint8Array` or [`CID`](https://github.com/multiformats/js-multiformats/#readme)
 * object represents a valid [CID](https://docs.ipfs.io/guides/concepts/cid/) or
 * `false` otherwise.
 */
export { isCID as cid }

/**
 * Returns `true` if the provided string is a valid `CID` in Base32 encoding or
 * `false` otherwise.
 */
export const base32cid = (cid: CID | string | Uint8Array): boolean => (isCID(cid) && isBase32EncodedMultibase(cid))

/**
 * Returns `true` if the provided string is a valid IPFS or IPNS path or `false`
 * otherwise.
 */
export const ipfsPath = (path: string | Uint8Array): boolean => isIpfs(path, pathPattern)

/**
 * Returns `true` if the provided string is a valid IPNS path or `false`
 * otherwise.
 */
export const ipnsPath = (path: string | Uint8Array): boolean => isIpns(path, pathPattern)

/**
 * Returns `true` if the provided string is a valid IPFS or IPNS url or path or
 * `false` otherwise.
 */
export const urlOrPath = (x: string | Uint8Array): boolean => url(x) || path(x)

/**
 * Returns `true` if the provided string is a valid "CID path" (IPFS path
 * without `/ipfs/` prefix) or `false` otherwise.
 */
export const cidPath = (path: string | Uint8Array | CID): boolean => isString(path) && !isCID(path) && isIpfs(`/ipfs/${path}`, pathPattern)
