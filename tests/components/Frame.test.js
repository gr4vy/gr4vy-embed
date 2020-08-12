import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import Frame from '../../src/components/Frame'
import { frameUrl } from '../../src/components/Frame/functions'
import { defaultStyle } from '../../src/components/Frame/View'


const options = {
  flow: [`store`],
  iframeHost: `localhost:8080`,
  apiHost: `localhost:3100`,
  bearerToken: `123456`
}

describe(`Controller`, () => {
  let listeners = null
  let framebus = null

  beforeEach(() => {
    listeners = []
    framebus = {
      on: (key, callback) => { listeners[key] = callback },
      emit: (key, data) => { listeners[key]?.(data) }
    }
  })

  test(`should default to be not loaded`, () => {
    const component = mount(<Frame {...options} />)
    expect(component.children().props()).toEqual({
      loaded: false,
      style: defaultStyle,
      url: `http://localhost:8080/`
    })
  })

  test(`should pass the options to the frame when it's ready`, () => {
    // create a mock frame bus and listen to updateOptions
    const callback = jest.fn()
    options.framebus = framebus
    options.framebus.on(`updateOptions`, callback) 

    // mount the frame and pretend the iframe send a frameReady event
    mount(<Frame {...options} />)
    act(() => { framebus.emit(`frameReady`, {}) })

    // assume a updateOptions event was sent which included the options
    expect(callback).toHaveBeenCalledWith(expect.objectContaining(options))
  })

  test(`should set the form to loaded once done`, () => {
    // create a mock frame bus
    options.framebus = framebus

    // mount the frame and pretend the iframe sends a formLoaded event
    const component = mount(<Frame {...options} />)
    act(() => { framebus.emit(`formLoaded`, {}) })
    component.update()

    // assume a formLoaded event was caught and the view updated
    expect(component.children().props()).toEqual({
      loaded: true,
      style: defaultStyle,
      url: `http://localhost:8080/`
    })
  })


  test(`should resize the frame on demand`, () => {
    // create a mock frame bus
    options.framebus = framebus

    // mount the frame and pretend the iframe sends a resize event
    const component = mount(<Frame {...options} />)
    act(() => { framebus.emit(`resize`, { frame: { height: `123px` }}) })
    component.update()

    // assume a formLoaded event was caught and the view updated
    expect(component.children().props()).toEqual({
      loaded: false,
      style: { ...defaultStyle, height: `123px` },
      url: `http://localhost:8080/`
    })
  })

  test(`should allow listening to frame events`, () => {
    // create a mock frame bus
    options.framebus = framebus
    options.onEvent = jest.fn()

    // mount the frame and pretend the iframe sends events
    const component = mount(<Frame {...options} />)
    act(() => { 
      framebus.emit(`formUpdate`, {}) 
      framebus.emit(`resourceCreated`, {}) 
      framebus.emit(`apiError`, {}) 
    })
    component.update()

    expect(options.onEvent).toHaveBeenCalledTimes(3)
    expect(options.onEvent).toHaveBeenCalledWith(`formUpdate`, {})
    expect(options.onEvent).toHaveBeenCalledWith(`resourceCreated`, {})
    expect(options.onEvent).toHaveBeenCalledWith(`apiError`, {})
  })
})

describe(`frameUrl`, () => {
  test(`should return a full URL for a hostname`, () => {
    expect(frameUrl({ 
      iframeHost: `cdn.apple.app.gr4vy.com`
    })).toEqual(`https://cdn.apple.app.gr4vy.com/`)
  })

  test(`should return an insecure URL for localhost`, () => {
    expect(frameUrl({ 
      iframeHost: `localhost:8000`
    })).toEqual(`http://localhost:8000/`)
  })

  test(`should return an insecure URL for 127.0.0.1`, () => {
    expect(frameUrl({ 
      iframeHost: `127.0.0.1:8000`
    })).toEqual(`http://127.0.0.1:8000/`)
  })
})