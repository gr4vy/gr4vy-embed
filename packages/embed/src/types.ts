import FormNapper from 'form-napper'
import Emitter from './Emitter_'
import Logger from './Logger_'

export type Config = {
  element: string // The element to insert the integration at
  form: string // The form to bind the integration to
  amount: number // The amount of a given currency to charge
  capture?: boolean // A flag to determine if payment should be captured at the same time as authorization
  currency: string // Currency to charge the amount in
  iframeHost: string // the hostname and port of the server that hosts the embedded UI
  apiHost: string // the hostname and port of the API server to use
  bearerToken: string // the JWT access token used to authenticate the API
  showButton?: boolean // wether to show a submit button in the embedded frame
  debug?: string // wether to output any debug messages. Must be set to `log` or `debug`.
  onEvent?: (name: string, event: { message: string }) => void // a callback function that's used to subscribe to events
  externalIdentifier?: string // an optional external identifier
  timeout?: number // the timeout we wait for the embedded form to load before we thow an `error` event
  preferResponse?: string // a development option that allows sending a `Prefer` header to force a certain API response from dev servers
}

export type InternalConfig = Config & {
  container: HTMLElement
  formContainer: HTMLElement
  iframeUrl: URL
  channel: string
  logger?: Logger
  emitter?: Emitter
  frame?: HTMLElement
  loaded?: boolean
  formNapper?: FormNapper
}
