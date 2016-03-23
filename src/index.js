'use strict'

const base58 = require('bs58')
const multihash = require('multihashes')

const urlPattern = /^https?:\/\/[^\/]+\/(ip(f|n)s)\/((\w+).*)/
const pathPattern = /^\/(ip(f|n)s)\/((\w+).*)/

function isMultihash (hash) {
  const formatted = convertToString(hash)
  try {
    const buffer = new Buffer(base58.decode(formatted))
    multihash.decode(buffer)
    return true
  } catch (e) {
    return false
  }
}

function isIpfs (input, pattern) {
  const formatted = convertToString(input)
  if (!formatted) {
    return false
  }

  const match = formatted.match(pattern)
  if (!match) {
    return false
  }

  if (match[1] !== 'ipfs') {
    return false
  }

  const hash = match[4]
  return isMultihash(hash)
}

function isIpns (input, pattern) {
  const formatted = convertToString(input)
  if (!formatted) {
    return false
  }
  const match = formatted.match(pattern)
  if (!match) {
    return false
  }

  if (match[1] !== 'ipns') {
    return false
  }

  return true
}

function convertToString (input) {
  if (Buffer.isBuffer(input)) {
    return base58.encode(input)
  }

  if (typeof input === 'string') {
    return input
  }

  return false
}

module.exports = {
  multihash: isMultihash,
  ipfsUrl: (url) => isIpfs(url, urlPattern),
  ipnsUrl: (url) => isIpns(url, urlPattern),
  url: (url) => (isIpfs(url, urlPattern) || isIpns(url, urlPattern)),
  urlPattern: urlPattern,
  ipfsPath: (path) => isIpfs(path, pathPattern),
  ipnsPath: (path) => isIpns(path, pathPattern),
  path: (path) => (isIpfs(path, pathPattern) || isIpns(path, pathPattern)),
  pathPattern: pathPattern,
  urlOrPath: (x) => (isIpfs(x, urlPattern) || isIpns(x, urlPattern) || isIpfs(x, pathPattern) || isIpns(x, pathPattern))
}
