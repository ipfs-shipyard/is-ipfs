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

test('isIPFS.url should match an ipfs.io url', function (t) {
  const actual = isIPFS.url('http://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o')
  const expected = true
  t.is(actual, expected)
  t.end()
})

test('isIPFS.url should not match a github ipfs repo url', function (t) {
  const actual = isIPFS.multihash('https://github.com/ipfs/js-ipfs/blob/master/README.md')
  const expected = false
  t.is(actual, expected)
  t.end()
})

test('isIPFS.url should not match an google url', function (t) {
  const actual = isIPFS.multihash('https://google.com')
  const expected = false
  t.is(actual, expected)
  t.end()
})
