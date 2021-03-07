import Framebus from 'framebus'
import {
  approvalRequired$,
  approvalUrl$,
  transactionCreated$,
  frameHeight$,
  approvalCancelled$,
  optionsLoaded$,
  formSubmit$,
  transactionFailed$,
} from '../subjects'
import { Config } from '../types'
import { pick } from '../utils'
import { log } from './logger'

export const optionKeys = [
  'amount',
  'currency',
  'intent',
  'apiHost',
  'token',
  'showButton',
  'debug',
  'externalIdentifier',
  'preferResponse',
  'buyerId',
  'buyerExternalIdentifier',
  'environment',
  'store',
  'country',
]

/**
 * Initializes the framebus connection to the nested frame.
 */
export const createEmitter = ({
  config,
  framebus,
}: {
  config: Config
  framebus: Framebus
}): void => {
  // initialize framebus and create curried functions for
  // listening and emitting events over framebus
  const { debug, onEvent } = config
  // const framebus = createFramebus(config)
  const on = loggedFramebusOn(framebus, debug)
  const emit = loggedFramebusEmit(framebus, debug)
  const subscribe = loggedFramebusSubscribe(framebus, debug, onEvent)
  const options = pick<Config>(config, optionKeys)

  on('approvalRequired', () => approvalRequired$.next(true))
  on('approvalNotRequired', () => approvalRequired$.next(false))
  on('approvalUrl', (url) => approvalUrl$.next(url))
  on('frameReady', () => emit('updateOptions', options))
  on('resize', (data) => frameHeight$.next(data.frame.height))
  on('optionsLoaded', () => optionsLoaded$.next(true))
  on('transactionCreated', ({ id }) => transactionCreated$.next(id))
  on('transactionFailed', (...ars) => transactionFailed$.next(...ars))

  formSubmit$.subscribe(() => emit('submitForm'))
  approvalCancelled$.subscribe(() => emit('approvalCancelled'))

  // subscribe to events that are exposed to the onEvent handler passed in by
  // the developer
  subscribe('formUpdate')
  subscribe('transactionCreated')
  subscribe('apiError')
}

/**
 * Wraps the framebus.on function with a logger that automatically logs any
 * incoming events when the debug level is set.
 *
 * @param framebus The framebus to wrap in a logger
 * @param debug The debug level
 */
export const loggedFramebusOn = (framebus: Framebus, debug: boolean) => (
  eventName: string,
  callback: (data: any) => void
) => {
  framebus.on(eventName, (data: any) => {
    log(`Page received`, { type: eventName, payload: data }, debug)
    callback(data)
  })
}

/**
 * Wraps the framebus.emit function with a logger that automatically logs any
 * outgoing events when the debug level is set.
 *
 * @param framebus The framebus to wrap in a logger
 * @param debug The debug level
 */
export const loggedFramebusEmit = (framebus: Framebus, debug: boolean) => (
  eventName: string,
  data?: any
) => {
  log(`Page emits`, { type: eventName, payload: data }, debug)
  framebus.emit(eventName, data)
}

/**
 * Wraps the framebus.on function with a logger that automatically logs any
 * outgoing events when the debug level is set, and then automatically emits the
 * same event to the onEvent handler.
 *
 * @param framebus The framebus to wrap in a logger
 * @param debug The debug level
 */
export const loggedFramebusSubscribe = (
  framebus: Framebus,
  debug: boolean,
  onEvent?: (name: string, event: any) => void
) => (eventName) => {
  const on = loggedFramebusOn(framebus, debug)
  on(eventName, (data) => onEvent?.(eventName, data))
}
