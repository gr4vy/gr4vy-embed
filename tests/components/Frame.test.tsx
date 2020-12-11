import { mount } from 'enzyme'
import FormNapper from 'form-napper'
import { act } from 'react-dom/test-utils'
import Frame from '../../src/components/Frame'
import { defaultStyle } from '../../src/components/Frame/View'
import { FormProvider } from '../../src/contexts/FormContext'

jest.mock(`form-napper`)

const options: {
  flow: Array<string>
  iframeHost: string
  apiHost: string
  bearerToken: string
  channel: string
  onEvent?: any
  framebus?: any
} = {
  flow: [`store`],
  iframeHost: `localhost:8080`,
  apiHost: `localhost:3100`,
  bearerToken: `123456`,
  channel: `mychannel`,
}

class MockBus {
  listeners
  constructor() {
    this.listeners = []
  }
  on(key, callback) {
    this.listeners[key] = this.listeners[key] || []
    this.listeners[key].push(callback)
  }
  emit(key, data) {
    this.listeners[key]?.map((callback) => callback(data))
  }
}

describe(`Controller`, () => {
  let framebus = null
  beforeEach(() => {
    framebus = new MockBus()
  })

  test(`should default to be not loaded`, () => {
    const component = mount(<Frame {...options} />)
    expect(component.children().props()).toEqual({
      loaded: false,
      valid: true,
      style: defaultStyle,
      url: `http://localhost:8080/?parentHost=http%3A%2F%2Flocalhost&channel=mychannel`,
    })
  })

  test(`should time out if the form doesn't load in time`, () => {
    jest.useFakeTimers()
    options.onEvent = jest.fn()
    mount(<Frame {...options} />)
    act(() => jest.runAllTimers())
    expect(options.onEvent).toHaveBeenCalledWith(`timeoutError`, {
      message: `Embedded form timed out`,
    })
  })

  test(`should pass the options to the frame when it's ready`, () => {
    // create a mock frame bus and listen to updateOptions
    const callback = jest.fn()
    options.framebus = framebus
    options.framebus.on(`updateOptions`, callback)

    // mount the frame and pretend the iframe send a frameReady event
    mount(<Frame {...options} />)
    act(() => {
      framebus.emit(`frameReady`, {})
    })

    // assume a updateOptions event was sent which included the options
    expect(callback).toHaveBeenCalledWith(expect.objectContaining(options))
  })

  test(`should set the form to loaded once done`, () => {
    // create a mock frame bus
    options.framebus = framebus

    // mount the frame and pretend the iframe sends a formLoaded event
    const component = mount(<Frame {...options} />)
    act(() => {
      framebus.emit(`formLoaded`, {})
    })
    component.update()

    // assume a formLoaded event was caught and the view updated
    expect(component.children().props()).toEqual({
      loaded: true,
      valid: true,
      style: defaultStyle,
      url: `http://localhost:8080/?parentHost=http%3A%2F%2Flocalhost&channel=mychannel`,
    })
  })

  test(`should resize the frame on demand`, () => {
    // create a mock frame bus
    options.framebus = framebus

    // mount the frame and pretend the iframe sends a resize event
    const component = mount(<Frame {...options} />)
    act(() => {
      framebus.emit(`resize`, { frame: { height: `123px` } })
    })
    component.update()

    // assume a formLoaded event was caught and the view updated
    expect(component.children().props()).toEqual({
      loaded: false,
      valid: true,
      style: { ...defaultStyle, height: `123px` },
      url: `http://localhost:8080/?parentHost=http%3A%2F%2Flocalhost&channel=mychannel`,
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

  test(`should hijack the parent form when present`, () => {
    const element = document.createElement(`form`)
    let hijackFunction = null
    const form = {
      hijack: jest.fn((callback) => {
        hijackFunction = callback
      }),
      inject: jest.fn(),
      submit: jest.fn(),
    }
    ;(FormNapper as jest.Mock).mockImplementation(() => form)

    options.framebus = framebus

    const component = mount(
      <FormProvider container={element}>
        <Frame {...options} />
      </FormProvider>
    )

    act(() => {
      framebus.emit(`resourceCreated`, {
        data: {
          resource_type: `card`,
          resource_id: `id`,
        },
      })
    })
    component.update()

    expect(form.hijack).toHaveBeenCalledWith(expect.any(Function))
    expect(form.inject).toHaveBeenCalledWith(`gr4vy_resource_type`, `card`)
    expect(form.inject).toHaveBeenCalledWith(`gr4vy_resource_id`, `id`)
    expect(form.submit).toHaveBeenCalled()

    framebus.on(`submitForm`, jest.fn())

    act(() => {
      hijackFunction()
    })

    expect(framebus.listeners.submitForm[0]).toHaveBeenCalled()
  })
})
