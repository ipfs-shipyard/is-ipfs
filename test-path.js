const test = require('tape')
const isIPFS = require('.')

test('isIPFS.ipfsPath should match an ipfs path', function (t) {
  const actual = isIPFS.ipfsPath('/ipfs/QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm')
  const expected = true
  t.is(actual, expected)
  t.end()
})

test('isIPFS.ipfsPath should match a complex ipfs path', function (t) {
  const actual = isIPFS.ipfsPath('/ipfs/QmeWz9YZEeNFXQhHg4PnR5ZiNr5isttgi5n1tc1eD5EfGU/content/index.html')
  const expected = true
  t.is(actual, expected)
  t.end()
})

test('isIPFS.ipfsPath should not match an ipns path', function (t) {
  const actual = isIPFS.ipfsPath('/ipns/github.com/')
  const expected = false
  t.is(actual, expected)
  t.end()
})

test('isIPFS.ipfsPath should not match a github ipfs repo href', function (t) {
  const actual = isIPFS.ipfsPath('/ipfs/js-ipfs/blob/master/README.md')
  const expected = false
  t.is(actual, expected)
  t.end()
})

test('isIPFS.ipfsPath should not match a path without prefix', function (t) {
  const actual = isIPFS.ipfsPath('/foo.bar')
  const expected = false
  t.is(actual, expected)
  t.end()
})

test('isIPFS.ipnsPath should not match an ipfs path', function (t) {
  const actual = isIPFS.ipnsPath('/ipfs/QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm')
  const expected = false
  t.is(actual, expected)
  t.end()
})

test('isIPFS.ipnsPath should match an ipns path', function (t) {
  const actual = isIPFS.ipnsPath('/ipns/github.com/')
  const expected = true
  t.is(actual, expected)
  t.end()
})

test('isIPFS.ipnsPath should not match a github ipfs repo path', function (t) {
  const actual = isIPFS.ipnsPath('/ipfs/js-ipfs/blob/master/README.md')
  const expected = false
  t.is(actual, expected)
  t.end()
})

test('isIPFS.ipnsPath should not match a path without prefix', function (t) {
  const actual = isIPFS.ipnsPath('/foo.bar')
  const expected = false
  t.is(actual, expected)
  t.end()
})

test('isIPFS.path should match an ipfs path', function (t) {
  const actual = isIPFS.path('/ipfs/QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm')
  const expected = true
  t.is(actual, expected)
  t.end()
})

test('isIPFS.path should match an ipns path', function (t) {
  const actual = isIPFS.path('/ipns/github.com/')
  const expected = true
  t.is(actual, expected)
  t.end()
})

test('isIPFS.path should not match a github ipfs repo path', function (t) {
  const actual = isIPFS.path('/ipfs/js-ipfs/blob/master/README.md')
  const expected = false
  t.is(actual, expected)
  t.end()
})

test('isIPFS.path should not match an path without prefix', function (t) {
  const actual = isIPFS.path('/foo.bar')
  const expected = false
  t.is(actual, expected)
  t.end()
})

test('isIPFS.urlOrPath should match ipfs url', function (t) {
  const actual = isIPFS.urlOrPath('http://ipfs.io/ipfs/QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm')
  const expected = true
  t.is(actual, expected)
  t.end()
})

test('isIPFS.urlOrPath should match ipns url', function (t) {
  const actual = isIPFS.urlOrPath('http://ipfs.io/ipns/foo.bar.com')
  const expected = true
  t.is(actual, expected)
  t.end()
})

test('isIPFS.urlOrPath should match a path', function (t) {
  const actual = isIPFS.urlOrPath('/ipfs/QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm')
  const expected = true
  t.is(actual, expected)
  t.end()
})

test('isIPFS.urlOrPath should match ipns path', function (t) {
  const actual = isIPFS.urlOrPath('/ipns/foo.bar.com')
  const expected = true
  t.is(actual, expected)
  t.end()
})
