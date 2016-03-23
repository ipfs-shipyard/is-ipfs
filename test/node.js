/* eslint-env mocha */
'use strict'
const fs = require('fs')
const tests = fs.readdirSync(__dirname)
// const poop = require('./test-multihash')

describe('node', () => {
  tests.filter((file) => {
    if (file === 'node.js' ||
        file === 'browser.js') {
      return false
    } else {
      return true
    }
  }).forEach((file) => {
    require('./' + file)
  })
})
