// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Crypto } = require('@peculiar/webcrypto')

global.crypto = new Crypto()
global.msCrypto = new Crypto()

PACKAGE_VERSION = require('./package.json').version
