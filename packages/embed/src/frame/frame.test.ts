import { createSubjectManager, SubjectManager } from '../subjects'
import { createFrameController, getFrameUrl } from './frame'

jest.mock('../utils/create-subject')

describe('createFrameController', () => {
  let subject: SubjectManager

  beforeEach(() => {
    subject = createSubjectManager()
  })

  test('should initialize a new iframe', () => {
    const iframeUrl = new URL('http://localhost:8000')
    const frameElement = document.createElement('iframe')
    createFrameController(frameElement, iframeUrl, subject)

    expect(frameElement.getAttribute('src')).toEqual('http://localhost:8000/')
    expect(frameElement.getAttribute('title')).toEqual(
      'Secure payment frame - Gr4vy'
    )
    expect(frameElement.getAttribute('style')).toEqual(
      'visibility: hidden; display: none; width: 100%; height: 0px; border: 0px; overflow: hidden;'
    )
    expect(frameElement.getAttribute('frameBorder')).toEqual('0')
    expect(frameElement.getAttribute('scrolling')).toEqual('no')
  })

  test('should change frame height when visible', () => {
    const iframeUrl = new URL('http://localhost:8000')
    const frameElement = document.createElement('iframe')
    createFrameController(frameElement, iframeUrl, subject)

    frameElement.style.visibility = 'unset'
    expect(frameElement.style.height).toBe('0px')
    subject.frameHeight$.next(50)
    expect(frameElement.style.height).toBe('50px')
  })

  test('should not change frame height when hidden', () => {
    const iframeUrl = new URL('http://localhost:8000')
    const frameElement = document.createElement('iframe')
    createFrameController(frameElement, iframeUrl, subject)

    frameElement.style.visibility = 'hidden'
    expect(frameElement.style.height).toBe('0px')
    subject.frameHeight$.next(50)
    expect(frameElement.style.height).toBe('0px')
  })

  test('should show the iframe when options loaded', () => {
    const iframeUrl = new URL('http://localhost:8000')
    const frameElement = document.createElement('iframe')
    createFrameController(frameElement, iframeUrl, subject)

    subject.optionsLoaded$.next(true)
    expect(frameElement.style.visibility).toBe('unset')
    expect(frameElement.style.display).toBe('unset')
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

  test('should include a font if defined in the theme', () => {
    const frameUrl = getFrameUrl({
      channel: '123456',
      config: {
        iframeHost: 'cdn.gr4vy.merchant.com',
        theme: {
          fonts: {
            body: 'Lato',
          },
        },
      },
    })
    expect(frameUrl).toBeInstanceOf(URL)
    expect(frameUrl.toString()).toEqual(
      'https://cdn.gr4vy.merchant.com/?parentHost=http%3A%2F%2Flocalhost&channel=123456&font=Lato'
    )
  })
})
