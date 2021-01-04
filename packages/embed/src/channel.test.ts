import { generateChannelId } from './channel'

describe('generateChannelId()', () => {
  test(`expect a random channel ID to be created`, () => {
    const channel1 = generateChannelId()
    const channel2 = generateChannelId()

    expect(channel1).not.toEqual(channel2)
    expect(channel1).toHaveLength(32)
    expect(channel2).toHaveLength(32)
  })
})
