const base58 = require('bs58')
const multihash = require('multihashes')

const urlPattern = /^https?:\/\/[^\/]+\/(ip(f|n)s)\/((\w+).*)/
const pathPattern = /^\/(ip(f|n)s)\/((\w+).*)/

function isMultihash (hash) {
  try {
    const buffer = new Buffer(base58.decode(hash))
    multihash.decode(buffer)
    return true
  } catch (e) {
    return false
  }
}

function isIpfs (input, pattern) {
  const match = input.match(pattern)
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
  const match = input.match(pattern)
  if (!match) {
    return false
  }

  if (match[1] !== 'ipns') {
    return false
  }

  return true
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
