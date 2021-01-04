import { Crypto } from '@peculiar/webcrypto'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { configure } from 'enzyme'

global.crypto = new Crypto()

configure({ adapter: new Adapter() })
