import { generateChannelId } from './generate-channel-id'

describe('generateChannelId()', () => {
  test(`should create a random channel ID`, () => {
    const channel1 = generateChannelId()
    const channel2 = generateChannelId()

    expect(channel1).not.toEqual(channel2)
    expect(channel1).toHaveLength(32)
    expect(channel2).toHaveLength(32)
  })

  test(`should fall back on windows.msCrypto in IE11`, () => {
    const crypto = global.crypto
    global.crypto = null
    expect(generateChannelId()).toBeDefined()
    global.crypto = crypto
  })
})
