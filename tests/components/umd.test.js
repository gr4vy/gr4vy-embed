import React from 'react'
import ReactDOM from 'react-dom'

import { setup } from '../../src/umd'
import Frame from '../../src/components/Frame'

const validOptions = {
  flow: [`authorize`, `capture`, `store`],
  amount:  1299,
  currency: `USD`,
  iframeHost: `cdn.apple.gr4vy.com`,
  apiHost: `api.apple.gr4vy.com` ,
  bearerToken: `123456`,
  showButton: true,
  debug: `debug`,
  onEvent: jest.fn()
}

describe(`setup`, () => {
  let element = null

  beforeEach(() => {
    ReactDOM.render = jest.fn()
    console.error = jest.fn()
    global.document.querySelector = jest.fn(() => {
      element = jest.mock()
      return element
    })
  })

  afterEach(() => {
    ReactDOM.render.mockRestore()
    console.error.mockRestore()
    global.document.querySelector.mockRestore()
  })

  test(`should render a Gr4vy form`, () => {
    setup({
      element: `.query`, 
      options: validOptions
    })
    expect(global.document.querySelector).toHaveBeenCalledWith(`.query`)
    expect(ReactDOM.render).toHaveBeenCalledWith(<Frame {...validOptions} />, element)
  })

  test(`should not render a Gr4vy form if the ID could not be found`, () => {
    global.document.querySelector = jest.fn()
    setup({
      element: `.query`, 
      options: validOptions
    })
    expect(global.document.querySelector).toHaveBeenCalledWith(`.query`)
    expect(ReactDOM.render).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledWith(`Gr4vy - Error`, {
      code: `argumentError`,
      argument: `element`,
      message: `.query must be a valid HTML element`
    })
    expect(validOptions.onEvent).toHaveBeenCalledWith(`argumentError`, {
      code: `argumentError`,
      argument: `element`,
      message: `.query must be a valid HTML element`
    })
  })
})