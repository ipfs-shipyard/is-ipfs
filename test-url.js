const test = require('tape')
const isIPFS = require('.')

test('isIPFS.ipfsUrl should match an ipfs url', function (t) {
  const actual = isIPFS.ipfsUrl('http://ipfs.io/ipfs/QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm')
  const expected = true
  t.is(actual, expected)
  t.end()
})

test('isIPFS.ipfsUrl should match a complex ipfs url', function (t) {
  const actual = isIPFS.ipfsUrl('http://ipfs.alexandria.media/ipfs/QmeWz9YZEeNFXQhHg4PnR5ZiNr5isttgi5n1tc1eD5EfGU/content/index.html')
  const expected = true
  t.is(actual, expected)
  t.end()
})

test('isIPFS.ipfsUrl should not match an ipns url', function (t) {
  const actual = isIPFS.ipfsUrl('http://ipfs.io/ipns/github.com/')
  const expected = false
  t.is(actual, expected)
  t.end()
})

test('isIPFS.ipfsUrl should not match a github ipfs repo url', function (t) {
  const actual = isIPFS.ipfsUrl('https://github.com/ipfs/js-ipfs/blob/master/README.md')
  const expected = false
  t.is(actual, expected)
  t.end()
})

test('isIPFS.ipfsUrl should not match an google url', function (t) {
  const actual = isIPFS.ipfsUrl('https://google.com')
  const expected = false
  t.is(actual, expected)
  t.end()
})

test('isIPFS.ipnsUrl should not match an ipfs url', function (t) {
  const actual = isIPFS.ipnsUrl('http://ipfs.io/ipfs/QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm')
  const expected = false
  t.is(actual, expected)
  t.end()
})

test('isIPFS.ipnsUrl should match an ipns url', function (t) {
  const actual = isIPFS.ipnsUrl('http://ipfs.io/ipns/github.com/')
  const expected = true
  t.is(actual, expected)
  t.end()
})

test('isIPFS.ipnsUrl should not match a github ipfs repo url', function (t) {
  const actual = isIPFS.ipnsUrl('https://github.com/ipfs/js-ipfs/blob/master/README.md')
  const expected = false
  t.is(actual, expected)
  t.end()
})

test('isIPFS.ipnsUrl should not match an google url', function (t) {
  const actual = isIPFS.ipnsUrl('https://google.com')
  const expected = false
  t.is(actual, expected)
  t.end()
})

test('isIPFS.url should match an ipfs url', function (t) {
  const actual = isIPFS.url('http://ipfs.io/ipfs/QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm')
  const expected = true
  t.is(actual, expected)
  t.end()
})

test('isIPFS.url should match an ipns url', function (t) {
  const actual = isIPFS.url('http://ipfs.io/ipns/github.com/')
  const expected = true
  t.is(actual, expected)
  t.end()
})

test('isIPFS.url should not match a github ipfs repo url', function (t) {
  const actual = isIPFS.url('https://github.com/ipfs/js-ipfs/blob/master/README.md')
  const expected = false
  t.is(actual, expected)
  t.end()
})

test('isIPFS.url should not match an google url', function (t) {
  const actual = isIPFS.url('https://google.com')
  const expected = false
  t.is(actual, expected)
  t.end()
})
