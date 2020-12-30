import FormNapper from 'form-napper'
import Framebus from 'framebus'
import { log } from './logger'
import { InternalConfig } from './types'

export const initEmitter = (
  form: FormNapper,
  frame: HTMLElement,
  config: InternalConfig,
  framebus?: Framebus
): void => {
  framebus ??= initFramebus(config)
  const on = loggedFramebusOn(framebus, config)
  const emit = loggedFramebusEmit(framebus, config)
  const subscribe = loggedFramebusSubscribe(framebus, config)

  on('frameReady', () => emit('updateOptions', config))
  on('resize', (data) => (frame.style.height = `${data.frame.height}px`))
  on('formLoaded', () => {
    config.loaded = true
    frame.style.visibility = 'unset'
  })

  subscribe('formUpdate')
  subscribe('resourceCreated')
  subscribe('apiError')

  form.hijack(() => emit('submitForm'))
  on('transactionCreated', ({ data }) => {
    form.inject(`gr4vy_transaction_id`, data.id)
    form.submit()
  })
}

export const initFramebus = (config: InternalConfig) => {
  const { iframeUrl, channel } = config
  const origin = `${iframeUrl.protocol}//${iframeUrl.host}`

  return Framebus.target({
    channel,
    origin,
  })
}

export const loggedFramebusOn = (
  framebus: Framebus,
  config: InternalConfig
) => (eventName: string, callback: (data: any) => void) => {
  framebus.on(eventName, (data: any) => {
    log(`Page received - ${eventName}`, data, config.debug)
    callback(data)
  })
}

export const loggedFramebusEmit = (
  framebus: Framebus,
  config: InternalConfig
) => (eventName: string, data?: any) => {
  log(`Page emits - ${eventName}`, data, config.debug)
  framebus.emit(eventName, data)
}

export const loggedFramebusSubscribe = (
  framebus: Framebus,
  config: InternalConfig
) => (eventName) => {
  const on = loggedFramebusOn(framebus, config)
  const emit = loggedFramebusEmit(framebus, config)

  on(eventName, (data) => emit(eventName, data))
}
