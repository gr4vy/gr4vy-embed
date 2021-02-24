import { createFormController } from './form'
import { Config } from './types'
import { validate } from './validation'
import { setup } from './'

jest.mock('./form')
jest.mock('./validation')

jest.spyOn(document, 'querySelector').mockImplementation((query) => {
  if (query === '#app') {
    return document.createElement('div')
  }
  if (query === '#form') {
    return document.createElement('form')
  }
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('setup()', () => {
  it('it should call the setup function if the props are valid', () => {
    ;(validate as jest.Mock).mockReturnValue(true)
    setup({
      element: `#app`,
      form: `#form`,
      amount: 1299,
      currency: `USD`,
      iframeHost: `127.0.0.1:8080`,
      apiHost: `127.0.0.1:3100`,
      bearerToken: `123456`,
      environment: 'development',
    })
    expect(createFormController).toHaveBeenCalled()
  })

  it('it should also work with HTML elements directly', () => {
    ;(validate as jest.Mock).mockReturnValue(true)
    setup({
      element: document.querySelector('#app'),
      form: document.querySelector('#form'),
      amount: 1299,
      currency: `USD`,
      iframeHost: `127.0.0.1:8080`,
      apiHost: `127.0.0.1:3100`,
      bearerToken: `123456`,
      environment: 'development',
    })
    expect(createFormController).toHaveBeenCalled()
  })

  test('it should exit when invalid config is given', () => {
    const invalidConfig: Config = {
      element: `#app`,
      form: `#form`,
      // incorrect amount
      amount: -1,
      currency: `USD`,
      iframeHost: `127.0.0.1:8080`,
      apiHost: `127.0.0.1:3100`,
      bearerToken: `123456`,
      environment: 'development',
    }
    ;(validate as jest.Mock).mockReturnValue(false)

    setup(invalidConfig)

    expect(validate).toHaveBeenCalledWith(invalidConfig)
    expect(createFormController).not.toHaveBeenCalled()
  })

  test('skip form setup if not set in config', () => {
    ;(validate as jest.Mock).mockReturnValue(true)
    setup({
      element: document.querySelector('#app'),
      amount: 1299,
      currency: `USD`,
      iframeHost: `127.0.0.1:8080`,
      apiHost: `127.0.0.1:3100`,
      bearerToken: `123456`,
      environment: 'development',
    })
    expect(createFormController).not.toHaveBeenCalled()
  })
})
