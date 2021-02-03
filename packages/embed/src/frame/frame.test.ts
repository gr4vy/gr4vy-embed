import { createFrameController, getFrameUrl } from '../frame'

describe('createFrameController', () => {
  test('should initialize a new iframe', () => {
    const iframeUrl = new URL('http://localhost:8000')
    const frameElement = document.createElement('iframe')
    createFrameController(frameElement, iframeUrl)

    expect(frameElement.getAttribute('src')).toEqual('http://localhost:8000/')
    expect(frameElement.getAttribute('style')).toEqual(
      'visibility: hidden; display: none; width: 100%; height: 0px; border: 0px; overflow: hidden;'
    )
    expect(frameElement.getAttribute('frameBorder')).toEqual('0')
    expect(frameElement.getAttribute('scrolling')).toEqual('no')
    expect(frameElement.getAttribute('title')).toEqual(
      'Secure payment frame - Gr4vy'
    )
  })
})

describe('getFrameUrl()', () => {
  test('should return a new frame host', () => {
    const frameUrl = getFrameUrl({
      channel: '123456',
      config: { iframeHost: 'localhost:8000' },
    })
    expect(frameUrl).toBeInstanceOf(URL)
    expect(frameUrl.toString()).toEqual(
      'http://localhost:8000/?parentHost=http%3A%2F%2Flocalhost&channel=123456'
    )
  })

  test('should use https for non localhost', () => {
    const frameUrl = getFrameUrl({
      channel: '123456',
      config: { iframeHost: 'cdn.gr4vy.merchant.com' },
    })
    expect(frameUrl).toBeInstanceOf(URL)
    expect(frameUrl.toString()).toEqual(
      'https://cdn.gr4vy.merchant.com/?parentHost=http%3A%2F%2Flocalhost&channel=123456'
    )
  })
})
