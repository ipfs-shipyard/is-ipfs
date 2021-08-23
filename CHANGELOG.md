## [6.0.2](https://github.com/ipfs/is-ipfs/compare/v6.0.1...v6.0.2) (2021-08-23)



## [6.0.1](https://github.com/ipfs/is-ipfs/compare/v6.0.0...v6.0.1) (2021-07-07)



# [6.0.0](https://github.com/ipfs/is-ipfs/compare/v5.0.0...v6.0.0) (2021-07-07)


### chore

* update to new multiformats ([#42](https://github.com/ipfs/is-ipfs/issues/42)) ([22bf9b7](https://github.com/ipfs/is-ipfs/commit/22bf9b7c88b6a9d6d9141f8565552557d9109ee8))


### BREAKING CHANGES

* uses the CID class from the new multiformats module

Co-authored-by: Marcin Rataj <lidel@lidel.org>



# [5.0.0](https://github.com/ipfs/is-ipfs/compare/v4.0.0...v5.0.0) (2021-04-19)



# [4.0.0](https://github.com/ipfs/is-ipfs/compare/v3.0.0...v4.0.0) (2021-03-03)


### Bug Fixes

* **peerMultiaddr:** require /p2p/{key} ([#40](https://github.com/ipfs/is-ipfs/issues/40)) ([25a2436](https://github.com/ipfs/is-ipfs/commit/25a2436d8af7d0ee55c778665b6e7e1d26422216)), closes [#38](https://github.com/ipfs/is-ipfs/issues/38)


### Features

* add types ([#39](https://github.com/ipfs/is-ipfs/issues/39)) ([4a96bde](https://github.com/ipfs/is-ipfs/commit/4a96bde4a3b83fa625964136f31443b24f83d583))


### BREAKING CHANGES

* **peerMultiaddr:** /dnsaddr without explicit /p2p/{key} is no longer a
valid peer multiaddr. See https://github.com/ipfs-shipyard/is-ipfs/issues/38 for rationale why.



# [3.0.0](https://github.com/ipfs/is-ipfs/compare/v2.0.0...v3.0.0) (2021-02-03)


### Features

* dnsaddr support in peerMultiaddr ([#35](https://github.com/ipfs/is-ipfs/issues/35)) ([4a4710d](https://github.com/ipfs/is-ipfs/commit/4a4710d13b546d8271c6b5f60f214c9010139666))
* **subdomain:** support inlined DNSLink names ([#36](https://github.com/ipfs/is-ipfs/issues/36)) ([7ab7125](https://github.com/ipfs/is-ipfs/commit/7ab712538fa9a8aee4a3d2cd3496371a8cf0e78b))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/ipfs/is-ipfs/compare/v1.0.3...v2.0.0) (2020-08-10)


### Bug Fixes

* replace node buffers with uint8arrays ([#34](https://github.com/ipfs/is-ipfs/issues/34)) ([ac5ec19](https://github.com/ipfs/is-ipfs/commit/ac5ec19))


### BREAKING CHANGES

* this module now only has deps that use Uint8Arrays and not Buffers

Co-authored-by: Marcin Rataj <lidel@lidel.org>



<a name="1.0.3"></a>
## [1.0.3](https://github.com/ipfs/is-ipfs/compare/v1.0.2...v1.0.3) (2020-04-22)



<a name="1.0.2"></a>
## [1.0.2](https://github.com/ipfs/is-ipfs/compare/v1.0.1...v1.0.2) (2020-04-22)



<a name="1.0.1"></a>
## [1.0.1](https://github.com/ipfs/is-ipfs/compare/v1.0.0...v1.0.1) (2020-04-22)


### Bug Fixes

* remove bs58 and add buffer ([#33](https://github.com/ipfs/is-ipfs/issues/33)) ([b711186](https://github.com/ipfs/is-ipfs/commit/b711186))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/ipfs/is-ipfs/compare/v0.6.3...v1.0.0) (2020-04-05)


### Features

* support subdomains in isIPFS.url(url) ([#32](https://github.com/ipfs/is-ipfs/issues/32)) ([22d001d](https://github.com/ipfs/is-ipfs/commit/22d001d)), closes [/github.com/ipfs/is-ipfs/pull/32#discussion_r396161665](https://github.com//github.com/ipfs/is-ipfs/pull/32/issues/discussion_r396161665)


### BREAKING CHANGES

* `isIPFS.subdomain` now returns true for <domain.tld>.ipns.localhost
* `isIPFS.subdomainPattern` changed

* test: support peer multiaddr with /p2p/

Context: https://github.com/libp2p/libp2p/issues/79

* fix: explicitly ignore URL param and hash

.url and .path now return true when validating:
https://ipfs.io/ipfs/<CID>?filename=name.png#foo

* refactor: simplify dnslinkSubdomain

License: MIT
Signed-off-by: Marcin Rataj <lidel@lidel.org>

* fix: url() check should include subdomain()

When .url was created we only had path gateways.  When .subdomain was
added, we did not update .url to test for subdomain gateways, which in
the long run will confuse people and feels like a bug.

Let's fix this: .url() will now check for both subdomain and path gateways
* .url(url) now returns true if .subdomain(url) is true

* refactor: merge DNSLink check into ipnsSubdomain()

This makes subdomain checks follow what path gateway checks do, removing
confusion.

In both cases (IPNS and DNSLink) user needs to perform online record
check, so this is just a handy way of detecting potential matches.

* docs: update examples
* refactor: switch to iso-url
* refactor: lint-package-json
* chore: update deps

License: MIT
Signed-off-by: Marcin Rataj <lidel@lidel.org>



<a name="0.6.3"></a>
## [0.6.3](https://github.com/ipfs/is-ipfs/compare/v0.6.1...v0.6.3) (2020-01-07)



<a name="0.6.2"></a>
## [0.6.2](https://github.com/ipfs/is-ipfs/compare/v0.6.1...v0.6.2) (2020-01-07)



<a name="0.6.1"></a>
## [0.6.1](https://github.com/ipfs/is-ipfs/compare/v0.6.0...v0.6.1) (2019-05-10)



<a name="0.6.0"></a>
# [0.6.0](https://github.com/ipfs/is-ipfs/compare/v0.5.1...v0.6.0) (2019-03-03)


### Bug Fixes

* **ci:** switch to modern .travis.yml ([972ab2e](https://github.com/ipfs/is-ipfs/commit/972ab2e))


### Features

* isIPFS.multiaddr(input) ([820d475](https://github.com/ipfs/is-ipfs/commit/820d475))
* isIPFS.peerMultiaddr(input) ([673dc59](https://github.com/ipfs/is-ipfs/commit/673dc59))



<a name="0.5.1"></a>
## [0.5.1](https://github.com/ipfs/is-ipfs/compare/v0.5.0...v0.5.1) (2019-02-11)



<a name="0.5.0"></a>
# [0.5.0](https://github.com/ipfs/is-ipfs/compare/v0.4.8...v0.5.0) (2019-02-11)


### Bug Fixes

* double validate ([#25](https://github.com/ipfs/is-ipfs/issues/25)) ([8f8616f](https://github.com/ipfs/is-ipfs/commit/8f8616f))


### Features

* add cidPath function ([7be55d3](https://github.com/ipfs/is-ipfs/commit/7be55d3))



<a name="0.4.8"></a>
## [0.4.8](https://github.com/ipfs/is-ipfs/compare/v0.4.7...v0.4.8) (2018-11-23)



<a name="0.4.7"></a>
## [0.4.7](https://github.com/ipfs/is-ipfs/compare/v0.4.6...v0.4.7) (2018-09-25)


### Bug Fixes

* switch to cids v0.5.5 ([c07a35f](https://github.com/ipfs/is-ipfs/commit/c07a35f))



<a name="0.4.6"></a>
## [0.4.6](https://github.com/ipfs/is-ipfs/compare/v0.4.5...v0.4.6) (2018-09-25)



<a name="0.4.5"></a>
## [0.4.5](https://github.com/ipfs/is-ipfs/compare/v0.4.4...v0.4.5) (2018-09-25)



<a name="0.4.4"></a>
## [0.4.4](https://github.com/ipfs/is-ipfs/compare/v0.4.2...v0.4.4) (2018-09-25)



<a name="0.4.3"></a>
## [0.4.3](https://github.com/ipfs/is-ipfs/compare/v0.4.2...v0.4.3) (2018-09-25)



<a name="0.4.2"></a>
## [0.4.2](https://github.com/ipfs/is-ipfs/compare/v0.4.1...v0.4.2) (2018-07-23)



<a name="0.4.1"></a>
## [0.4.1](https://github.com/ipfs/is-ipfs/compare/v0.3.2...v0.4.1) (2018-07-23)


### Bug Fixes

* release badge in readme ([ae0f738](https://github.com/ipfs/is-ipfs/commit/ae0f738))
* remove old node builds from TravisCI ([17f9292](https://github.com/ipfs/is-ipfs/commit/17f9292))


### Features

* support cidv1b32 in subdomains ([a793da7](https://github.com/ipfs/is-ipfs/commit/a793da7))



<a name="0.3.2"></a>
## [0.3.2](https://github.com/ipfs/is-ipfs/compare/v0.3.1...v0.3.2) (2017-09-11)



<a name="0.3.1"></a>
## [0.3.1](https://github.com/ipfs/is-ipfs/compare/v0.3.0...v0.3.1) (2017-09-11)


### Features

* CID Support ([c66bb64](https://github.com/ipfs/is-ipfs/commit/c66bb64)), closes [#12](https://github.com/ipfs/is-ipfs/issues/12)



<a name="0.3.0"></a>
# [0.3.0](https://github.com/ipfs/is-ipfs/compare/v0.2.1...v0.3.0) (2017-02-01)


### Bug Fixes

* **lint:** unnecessary escape ([3c65677](https://github.com/ipfs/is-ipfs/commit/3c65677))


### Features

* update scripts for release ([8e85bd7](https://github.com/ipfs/is-ipfs/commit/8e85bd7))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/ipfs/is-ipfs/compare/v0.1.0...v0.2.1) (2016-10-01)



<a name="0.1.0"></a>
# [0.1.0](https://github.com/ipfs/is-ipfs/compare/v0.0.4...v0.1.0) (2016-02-10)



<a name="0.0.4"></a>
## [0.0.4](https://github.com/ipfs/is-ipfs/compare/v0.0.2...v0.0.4) (2016-02-03)



<a name="0.0.2"></a>
## 0.0.2 (2016-02-02)



