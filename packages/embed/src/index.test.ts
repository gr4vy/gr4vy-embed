jest.mock('./frame', () => ({
  __esModule: true,
  setupFrame: jest.fn(),
  getFrameUrl: jest.fn().mockImplementation(() => 'https://example.com'),
}))

import { setupFrame } from './frame'
import { setup } from './index'

let errorSpy

beforeEach(() => {
  errorSpy = jest.spyOn(console, 'error').mockImplementation()

  jest.spyOn(document, 'querySelector').mockImplementation(() => {
    return document.createElement('div')
  })
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('setup()', () => {
  it('it should call the setup function if the props are valid', () => {
    setup({
      element: `#app`,
      form: `#form`,
      amount: 1299,
      currency: `USD`,
      iframeHost: `127.0.0.1:8080`,
      apiHost: `127.0.0.1:3100`,
      bearerToken: `123456`,
    })

    expect(errorSpy).not.toHaveBeenCalled()
    expect(setupFrame).toHaveBeenCalled()
  })

  it('it should also work with HTML elements directly', () => {
    setup({
      element: document.querySelector('#app'),
      form: document.querySelector('#form'),
      amount: 1299,
      currency: `USD`,
      iframeHost: `127.0.0.1:8080`,
      apiHost: `127.0.0.1:3100`,
      bearerToken: `123456`,
    })

    expect(errorSpy).not.toHaveBeenCalled()
    expect(setupFrame).toHaveBeenCalled()
  })

  test('it should log an error if the props are invalid', () => {
    setup({
      element: `#app`,
      form: `#form`,
      // incorrect amount
      amount: -1,
      currency: `USD`,
      iframeHost: `127.0.0.1:8080`,
      apiHost: `127.0.0.1:3100`,
      bearerToken: `123456`,
    })

    expect(errorSpy).toHaveBeenCalled()
    expect(setupFrame).not.toHaveBeenCalled()
  })
})
