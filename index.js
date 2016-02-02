const base58 = require('bs58')
const multihash = require('multihashes')

const urlPattern = /^https?:\/\/[^\/]+\/(ip(f|n)s)\/(\w+)/

function isMultihash (hash) {
  try {
    const buffer = new Buffer(base58.decode(hash))
    multihash.decode(buffer)
    return true
  } catch (e) {
    return false
  }
}

function isIpfsUrl (url) {
  const match = url.match(urlPattern)
  if (!match) {
    return false
  }

  if (match[1] !== 'ipfs') {
    return false
  }

  const hash = match[3]
  return isMultihash(hash)
}

function isIpnsUrl (url) {
  const match = url.match(urlPattern)
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
  ipfsUrl: isIpfsUrl,
  ipnsUrl: isIpnsUrl,
  url: (url) => (isIpfsUrl(url) || isIpnsUrl(url)),
  urlPattern: urlPattern
}
