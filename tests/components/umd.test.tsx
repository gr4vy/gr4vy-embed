import ReactDOM from 'react-dom'
import Frame from '../../src/components/Frame'
import { FormProvider } from '../../src/contexts/FormContext'
import { setup } from '../../src/umd'

const validOptions = {
  amount: 1299,
  currency: `USD`,
  iframeHost: `cdn.apple.gr4vy.com`,
  apiHost: `api.apple.gr4vy.com`,
  bearerToken: `123456`,
  showButton: true,
  debug: `debug`,
  onEvent: jest.fn(),
}

describe(`setup`, () => {
  let element = null

  beforeEach(() => {
    ReactDOM.render = jest.fn()
    console.error = jest.fn()
    global.document.querySelector = jest.fn(() => {
      element = {}
      return element
    })
  })

  afterEach(() => {
    ;(ReactDOM.render as jest.Mock).mockRestore()
    ;(console.error as jest.Mock).mockRestore()
    ;(global.document.querySelector as jest.Mock).mockRestore()
  })

  test(`should render a Gr4vy form`, () => {
    setup({
      element: `.query`,
      options: validOptions,
    })
    expect(global.document.querySelector).toHaveBeenCalledWith(`.query`)
    expect(ReactDOM.render).toHaveBeenCalledWith(
      <Frame {...validOptions} />,
      element
    )
  })

  test(`should render a Gr4vy form with a form provider`, () => {
    setup({
      element: `.query`,
      form: `.form`,
      options: validOptions,
    })
    expect(global.document.querySelector).toHaveBeenCalledWith(`.query`)
    expect(ReactDOM.render).toHaveBeenCalledWith(
      <FormProvider container={element}>
        <Frame {...validOptions} />
      </FormProvider>,
      element
    )
  })

  test(`should not render a Gr4vy form if the ID could not be found`, () => {
    global.document.querySelector = jest.fn()
    setup({
      element: `.query`,
      options: validOptions,
    })
    expect(global.document.querySelector).toHaveBeenCalledWith(`.query`)
    expect(ReactDOM.render).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledWith(`Gr4vy - Error`, {
      code: `argumentError`,
      argument: `element`,
      message: `.query must be a valid HTML element`,
    })
    expect(validOptions.onEvent).toHaveBeenCalledWith(`argumentError`, {
      code: `argumentError`,
      argument: `element`,
      message: `.query must be a valid HTML element`,
    })
  })

  test(`should not render a Gr4vy form if the wrapped form could`, () => {
    global.document.querySelector = jest.fn().mockImplementation((key) => {
      if (key === `.query`) {
        return {}
      } else {
        return null
      }
    })
    setup({
      element: `.query`,
      form: `.form`,
      options: validOptions,
    })
    expect(global.document.querySelector).toHaveBeenCalledWith(`.query`)
    expect(global.document.querySelector).toHaveBeenCalledWith(`.form`)

    expect(ReactDOM.render).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledWith(`Gr4vy - Error`, {
      code: `argumentError`,
      argument: `form`,
      message: `.form must be a valid HTML form`,
    })
    expect(validOptions.onEvent).toHaveBeenCalledWith(`argumentError`, {
      code: `argumentError`,
      argument: `form`,
      message: `.form must be a valid HTML form`,
    })
  })
})
