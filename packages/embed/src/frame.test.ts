import { setupFrame, initFrame, getFrameUrl } from './frame'

describe('setupFrame()', () => {
  test('should initialize and bind a new frame', () => {
    const element = document.createElement('div') as HTMLElement

    setupFrame({
      element,
      form: document.createElement('form') as HTMLElement,
      amount: 1299,
      currency: `USD`,
      iframeHost: `127.0.0.1:8080`,
      iframeUrl: new URL(`http://127.0.0.1:8080`),
      apiHost: `127.0.0.1:3100`,
      bearerToken: `123456`,
      channel: '123',
    })

    expect(element.innerHTML).toContain(
      '<iframe src="http://127.0.0.1:8080/" title="Secure payment frame - Gr4vy" style="visibility: hidden; width: 100%; height: 1px; border: 0px; overflow: hidden;" frameborder="0" scrolling="no"></iframe>'
    )
  })
})

describe('initFrame()', () => {
  test('should initialize a new iframe', () => {
    const iframeUrl = new URL('http://localhost:8000')
    const frame = initFrame({ iframeUrl })

    expect(frame).toBeInstanceOf(HTMLElement)
    expect(frame.getAttribute('src')).toEqual('http://localhost:8000/')
    expect(frame.getAttribute('style')).toEqual(
      'visibility: hidden; width: 100%; height: 1px; border: 0px; overflow: hidden;'
    )
    expect(frame.getAttribute('frameBorder')).toEqual('0')
    expect(frame.getAttribute('scrolling')).toEqual('no')
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
