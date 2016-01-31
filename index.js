const base58 = require('bs58')
const multihash = require('multihashes')

const urlPattern = /^https?:\/\/[^\/]+\/ip(f|n)s\/(\w+)/

function isMultihash (hash) {
  try {
    const buffer = new Buffer(base58.decode(hash))
    multihash.decode(buffer)
    return true
  } catch (e) {
    return false
  }
}

function isIPFSUrl (url) {
  const match = url.match(urlPattern)
  if (!match) {
    return false
  }

  const hash = match[2]
  return isMultihash(hash)
}

module.exports = {
  multihash: isMultihash,
  url: isIPFSUrl,
  urlPattern: urlPattern
}
