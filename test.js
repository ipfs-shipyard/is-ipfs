const test = require('tape')
const isIPFS = require('.')

test('isIPFS.multihash should match a valid multihash', function (t) {
  const actual = isIPFS.multihash('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o')
  const expected = true
  t.is(actual, expected)
  t.end()
})

test('isIPFS.multihash should not match an invalid multihash', function (t) {
  const actual = isIPFS.multihash('noop')
  const expected = false
  t.is(actual, expected)
  t.end()
})

test('isIPFS.ipfsUrl should match an ipfs url', function (t) {
  const actual = isIPFS.ipfsUrl('http://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o')
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
  const actual = isIPFS.ipnsUrl('http://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o')
  const expected = false
  t.is(actual, expected)
  t.end()
})

test('isIPFS.ipnsUrl should not match an ipns url', function (t) {
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
  const actual = isIPFS.url('http://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o')
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
