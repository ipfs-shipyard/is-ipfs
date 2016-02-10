const test = require('tape')
const isIPFS = require('.')

test('isIPFS.multihash should match a valid multihash', function (t) {
  const actual = isIPFS.multihash('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o')
  const expected = true
  t.is(actual, expected)
  t.end()
})

test('isIPFS.multihash should not match an invalid multihash (with a typo)', function (t) {
  const actual = isIPFS.multihash('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE70')
  const expected = false
  t.is(actual, expected)
  t.end()
})

test('isIPFS.multihash should not match an invalid multihash', function (t) {
  const actual = isIPFS.multihash('noop')
  const expected = false
  t.is(actual, expected)
  t.end()
})

