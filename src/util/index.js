// const {sortBy} from 'lodash'
const PublicKey = require('../PublicKey')
const bn = require('../BigNumber')
const { Buffer } = require('buffer')
const Hash = require('../crypto/hash')
const Base58Check = require('../encoding/base58check.js')

// original order
// "02bc11aa5c35acda6f6f219b94742dd9a93c1d11c579f98f7e3da05ad910a48306"
// "031a9d45859da69dbc444723048932b8f56bb9937c5260238b4821a3b1ccfd78b6"
// "02746aa551414e16921a3249ddd5e49923299c97102c7e7c5b9c6e81dd3949556d"

// sorted order
// "031a9d45859da69dbc444723048932b8f56bb9937c5260238b4821a3b1ccfd78b6"
// "02746aa551414e16921a3249ddd5e49923299c97102c7e7c5b9c6e81dd3949556d"
// "02bc11aa5c35acda6f6f219b94742dd9a93c1d11c579f98f7e3da05ad910a48306
// cosign address 8NJ7dbKsG2NRiBqdhY6LyKMiWp166cFBiG

const sortBigNumber = (a, b) => {
    const bBigInt = bn.fromBuffer(Buffer.from(a, 'hex').slice(1))
    const aBigInt = bn.fromBuffer(Buffer.from(b, 'hex').slice(1))
    return bBigInt.gt(aBigInt)
}

const pubKeys = [
    '02bc11aa5c35acda6f6f219b94742dd9a93c1d11c579f98f7e3da05ad910a48306',
    '031a9d45859da69dbc444723048932b8f56bb9937c5260238b4821a3b1ccfd78b6',
    '02746aa551414e16921a3249ddd5e49923299c97102c7e7c5b9c6e81dd3949556d',
]

const sortedPubKeys = pubKeys.sort(sortBigNumber)

let buf = Buffer.from([0x51 + 2 - 1])

sortedPubKeys.forEach(pub => {
    const pubInHex = Buffer.from(pub, 'hex')
    buf = Buffer.concat([buf, Buffer.from([pubInHex.length]), pubInHex])
})

buf = Buffer.concat([buf, Buffer.from([0x51 + 3 - 1, 0xae])])

const hashBuf = Hash.sha256ripemd160(buf)
const programHashBuf = Buffer.concat([Buffer.from([0x12]), hashBuf])

const rst = Base58Check.encode(programHashBuf)
console.log(rst)

// .sort(sortBigNumber)
// .forEach(p => console.log(p.point.x, p.point.y))

// ==================================liuliuliu=========
// 12038008875108539419521983537029432172241423910893568853322999215768209291446
// 85066027716602020487865798095715070667559791920922403917147290848646131909382
// =====================111feifefei x y ==========================================111feifefei x y ==================================liuliuliu=========
// 52656717203305732839528324767635091410208554945329971420403428054691736016237
// 12038008875108539419521983537029432172241423910893568853322999215768209291446
// =====================111feifefei x y ==========================================111feifefei x y ==================================liuliuliu=========
// 52656717203305732839528324767635091410208554945329971420403428054691736016237
// 85066027716602020487865798095715070667559791920922403917147290848646131909382
// =====================111feifefei x y ==========================================111feifefei x y ==================================liuliuliu=========
// 52656717203305732839528324767635091410208554945329971420403428054691736016237
// 12038008875108539419521983537029432172241423910893568853322999215768209291446
