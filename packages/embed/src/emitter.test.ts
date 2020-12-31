import FormNapper from 'form-napper'
import Framebus from 'framebus'
import {
  options,
  loggedFramebusOn,
  loggedFramebusEmit,
  loggedFramebusSubscribe,
  createFramebus,
  initFramebus,
} from './emitter'

let validConfig

beforeEach(() => {
  validConfig = {
    element: document.createElement('div') as HTMLElement,
    form: null,
    amount: 1299,
    currency: `USD`,
    iframeHost: `127.0.0.1:8080`,
    iframeUrl: new URL(`http://127.0.0.1:8080`),
    apiHost: `127.0.0.1:3100`,
    bearerToken: `123456`,
    channel: 'asdasdasdasdasdasd',
    onEvent: jest.fn(),
  }
})

let framebus
beforeEach(() => {
  framebus = Framebus.target({
    channel: '123',
    origin: 'http://localhost:3000',
  })
})

let logSpy
beforeEach(() => {
  logSpy = jest.spyOn(console, 'log').mockImplementation()
})

afterEach(() => {
  jest.clearAllMocks()
  ;(Framebus as any).clearInstances()
})

describe('loggedFramebusOn()', () => {
  test('should log and then create a callback', () => {
    const on = loggedFramebusOn(framebus, 'log')

    const eventName = 'myEvent'
    const data = {}
    const callback = jest.fn()
    on(eventName, callback)
    framebus.emit(eventName, data)

    expect(callback).toHaveBeenCalledWith(data)
    expect(logSpy).toHaveBeenCalledWith(`Gr4vy - Page received - myEvent`, `{}`)
  })
})

describe('loggedFramebusEmit()', () => {
  test('should log and then emit', () => {
    const emit = loggedFramebusEmit(framebus, 'log')

    const eventName = 'myEvent'
    const data = {}
    const callback = jest.fn()
    framebus.on(eventName, callback)
    emit(eventName, data)

    expect(logSpy).toHaveBeenCalledWith(`Gr4vy - Page emits - myEvent`, `{}`)
  })
})

describe('loggedFramebusSubscribe()', () => {
  test('should trigger the callback when the event is emitted', () => {
    const callback = jest.fn()
    const subscribe = loggedFramebusSubscribe(framebus, 'log', callback)

    const eventName = 'myEvent'
    const data = {}
    subscribe(eventName)
    framebus.emit(eventName, data)

    expect(callback).toHaveBeenCalledWith(`myEvent`, {})
    expect(logSpy).toHaveBeenCalledWith('Gr4vy - Page received - myEvent', '{}')
  })

  test('should work without a callback function', () => {
    const subscribe = loggedFramebusSubscribe(framebus, 'log')

    const eventName = 'myEvent'
    const data = {}
    subscribe(eventName)
    framebus.emit(eventName, data)

    expect(logSpy).toHaveBeenCalledWith('Gr4vy - Page received - myEvent', '{}')
  })
})

describe('createFramebus()', () => {
  test('should return a new framebus object', () => {
    const framebus = createFramebus(validConfig)
    expect(framebus.origin).toBe('http://127.0.0.1:8080')
    expect(framebus.channel).toBe(validConfig.channel)
  })
})

describe('initFramebus()', () => {
  test('should set up the framebus listeners', () => {
    // create a frame
    const frame = document.createElement('iframe')

    // mock formnapper
    const formElement = document.createElement('form')
    const formNapper = new FormNapper(formElement)
    formNapper.inject = jest.fn()
    formNapper.submit = jest.fn()

    // init framebus
    initFramebus({ frame, formNapper, config: validConfig })

    // make sure all the expected events are regustered
    const fb = (Framebus as any).getInstances()[1]
    expect(fb.events['frameReady']).toHaveLength(1)
    expect(fb.events['resize']).toHaveLength(1)
    expect(fb.events['formLoaded']).toHaveLength(1)
    expect(fb.events['transactionCreated']).toHaveLength(2)
    expect(fb.events['formUpdate']).toHaveLength(1)
    expect(fb.events['apiError']).toHaveLength(1)

    // trigger update options when the frame is ready
    fb.on('updateOptions', jest.fn())
    fb.emit('frameReady')
    expect(fb.events['updateOptions'][0]).toHaveBeenCalledWith(
      options(validConfig)
    )

    // tigger an iframe resize when the iframe content resized
    fb.emit('resize', { frame: { height: 123 } })
    expect(frame.style.height).toEqual('123px')

    // update the config to set the form as loaded and show the UI
    fb.emit('formLoaded')
    expect(validConfig.loaded).toEqual(true)
    expect(frame.style.visibility).toEqual('unset')

    // trigger a submitForm event when the form is submitted
    fb.on('submitForm', jest.fn())
    formElement.submit()
    expect(fb.events['submitForm'][0]).toHaveBeenCalled()

    // inject content and submit the form when the transaction was created
    fb.emit('transactionCreated', { id: '123' })
    expect(formNapper.inject).toHaveBeenCalledWith(
      `gr4vy_transaction_id`,
      '123'
    )
    expect(formNapper.submit).toHaveBeenCalled()

    // subscribe to these events and pass them straight to the `onEvent` handler
    fb.emit('formUpdate', {})
    expect(validConfig.onEvent).toHaveBeenCalledWith('formUpdate', {})
    fb.emit('transactionCreated', { id: '123' })
    expect(validConfig.onEvent).toHaveBeenCalledWith('transactionCreated', {
      id: '123',
    })
    fb.emit('apiError', {})
    expect(validConfig.onEvent).toHaveBeenCalledWith('apiError', {})
  })

  test('should work without a form', () => {
    const frame = document.createElement('iframe')
    initFramebus({ frame, config: validConfig })
  })
})

describe('options()', () => {
  test('should extract only the allowed values from an internal config object', () => {
    const opts = options(validConfig)
    expect(opts).toEqual({
      amount: 1299,
      currency: `USD`,
      apiHost: `127.0.0.1:3100`,
      bearerToken: `123456`,
      channel: 'asdasdasdasdasdasd',
      buyerExternalIdentifier: undefined,
      buyerId: undefined,
      capture: undefined,
      debug: undefined,
      externalIdentifier: undefined,
      preferResponse: undefined,
      showButton: undefined,
    })
  })
})
