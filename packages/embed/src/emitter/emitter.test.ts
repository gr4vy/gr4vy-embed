import Framebus from 'framebus'
import {
  frameHeight$,
  optionsLoaded$,
  formSubmit$,
  transactionCreated$,
  approvalRequired$,
  approvalUrl$,
} from '../subjects'
import { pick } from '../utils'
import {
  loggedFramebusOn,
  loggedFramebusEmit,
  loggedFramebusSubscribe,
  createEmitter,
  optionKeys,
} from './emitter'
let validConfig

jest.mock('../utils/create-subject')

beforeEach(() => {
  validConfig = {
    element: document.createElement('div') as HTMLElement,
    form: null,
    amount: 1299,
    currency: `USD`,
    iframeHost: `127.0.0.1:8080`,
    iframeUrl: new URL(`http://127.0.0.1:8080`),
    apiHost: `127.0.0.1:3100`,
    token: `123456`,
    channel: 'asdasdasdasdasdasd',
    onEvent: jest.fn(),
    store: 'ask',
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
    const on = loggedFramebusOn(framebus, true)

    const eventName = 'myEvent'
    const data = {}
    const callback = jest.fn()
    on(eventName, callback)
    framebus.emit(eventName, data)

    expect(callback).toHaveBeenCalledWith(data)
    expect(logSpy).toHaveBeenCalledWith(`Gr4vy - Page received`, {
      type: `myEvent`,
      payload: {},
    })
  })
})

describe('loggedFramebusEmit()', () => {
  test('should log and then emit', () => {
    const emit = loggedFramebusEmit(framebus, true)

    const eventName = 'myEvent'
    const data = {}
    const callback = jest.fn()
    framebus.on(eventName, callback)
    emit(eventName, data)

    expect(logSpy).toHaveBeenCalledWith(`Gr4vy - Page emits`, {
      type: `myEvent`,
      payload: {},
    })
  })
})

describe('loggedFramebusSubscribe()', () => {
  test('should trigger the callback when the event is emitted', () => {
    const callback = jest.fn()
    const subscribe = loggedFramebusSubscribe(framebus, true, callback)

    const eventName = 'myEvent'
    const data = {}
    subscribe(eventName)
    framebus.emit(eventName, data)

    expect(callback).toHaveBeenCalledWith(`myEvent`, {})
    expect(logSpy).toHaveBeenCalledWith('Gr4vy - Page received', {
      type: `myEvent`,
      payload: {},
    })
  })

  test('should work without a callback function', () => {
    const subscribe = loggedFramebusSubscribe(framebus, true)

    const eventName = 'myEvent'
    const data = {}
    subscribe(eventName)
    framebus.emit(eventName, data)

    expect(logSpy).toHaveBeenCalledWith('Gr4vy - Page received', {
      type: `myEvent`,
      payload: {},
    })
  })
})

describe('createEmitter', () => {
  test('should set up the framebus listeners', () => {
    // create a frame
    const framebus = Framebus.target({
      channel: '123',
      origin: 'http://localhost:3000',
    })

    // init framebus
    createEmitter({ framebus, config: validConfig })

    // make sure all the expected events are regustered
    const fb = (Framebus as any).getInstances()[1]
    expect(fb.events['frameReady']).toHaveLength(1)
    expect(fb.events['resize']).toHaveLength(1)
    expect(fb.events['optionsLoaded']).toHaveLength(1)
    expect(fb.events['transactionCreated']).toHaveLength(2)
    expect(fb.events['formUpdate']).toHaveLength(1)
    expect(fb.events['apiError']).toHaveLength(1)

    // trigger update options when the frame is ready
    fb.on('updateOptions', jest.fn())
    fb.emit('frameReady')
    expect(fb.events['updateOptions'][0]).toHaveBeenCalledWith(
      pick(validConfig, optionKeys)
    )

    // tigger an iframe resize when the iframe content resized
    fb.emit('resize', { frame: { height: 123 } })
    expect(frameHeight$.value()).toBe(123)

    // update the config to set the form as loaded and show the UI
    fb.emit('optionsLoaded')
    expect(optionsLoaded$.value()).toBe(true)

    // approvals
    fb.emit('approvalRequired')
    expect(approvalRequired$.value()).toBe(true)

    fb.emit('approvalNotRequired')
    expect(approvalRequired$.value()).toBe(false)

    fb.emit('approvalUrl', 'test-url')
    expect(approvalUrl$.value()).toBe('test-url')

    // trigger a submitForm event when the form is submitted
    fb.on('submitForm', jest.fn())
    formSubmit$.next()
    expect(fb.events['submitForm'][0]).toHaveBeenCalled()

    // inject content and submit the form when the transaction was created
    fb.emit('transactionCreated', { id: 'transaction-id' })
    expect(transactionCreated$.value()).toStrictEqual({ id: 'transaction-id' })

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
})
