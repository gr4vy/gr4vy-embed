if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = require('util').TextDecoder
}

import { Crypto } from '@peculiar/webcrypto'
import Adapter from '@chalbert/enzyme-adapter-react-18'
import { configure } from 'enzyme'

global.crypto = new Crypto()

configure({ adapter: new Adapter() })
