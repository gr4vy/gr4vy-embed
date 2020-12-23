import { useState, useLayoutEffect, useContext, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { FormContext } from '../../contexts/FormContext'
import Emitter from './Emitter'
import Logger from './Logger'
import View, { defaultStyle } from './View'
import { frameUrl, validate } from './functions'

export type FrameProps = {
  /* 
    The amount of a given currency to charge
  */
  amount: number
  /**
   * A flag to determine if payment should be captured at the same time as authorization
   */
  capture?: boolean
  /**
   * Currency to charge the amount in
   */
  currency: string
  iframeHost: string // the hostname and port of the server that hosts the embedded UI
  apiHost: string // the hostname and port of the API server to use
  bearerToken: string // the JWT access token used to authenticate the API
  showButton?: boolean // wether to show a submit button in the embedded frame
  debug?: string // wether to output any debug messages. Must be set to `log` or `debug`.
  onEvent?: (name: string, event: { message: string }) => void // a callback function that's used to subscribe to events
  externalIdentifier?: string // an optional external identifier
  timeout?: number // the timeout we wait for the embedded form to load before we thow an `error` event
  /* 
    a development option that allows sending a `Prefer` header to force a
    certain API response from dev servers
  */
  preferResponse?: string
  channel?: string
}

/**
 * Loads the embedded Gr4vy UI through an iFrame.
 *
 * Starts by showing a loader, and then sends a message to the
 * embedded frame to initialize it. Once it receives the loaded message
 * it resizes the iframe and shows it to the user.
 */
const Frame = (props: FrameProps) => {
  const [channel] = useState(uuid())
  const options = {
    onEvent: () => {},
    timeout: 10000,
    capture: true,
    showButton: false,
    channel,
    ...props,
  }
  // validate that all required options are present, in the right format,
  // type, etc
  const valid = validate(options)
  // keep the state of the UI to determine if the frame can be shown
  const [loaded, setLoaded] = useState(false)
  // tracks if the form has timed out
  const [timedOut, setTimedOut] = useState(false)
  // keep track of the width and height of the UI, which is updated as the
  // frame content changes
  const [style, setStyle] = useState(defaultStyle)
  // try to load the optional form
  const form = useContext(FormContext)

  // deterimine the URL for the frame
  const url = frameUrl(options)
  // initialize a logger and an emitter for cross frame comms
  const logger = new Logger({ options })
  const emitter = new Emitter({ logger, url, options })

  // wait for the UI to load and then register some events
  useLayoutEffect(() => {
    // wait for a frameReady message and then send the iframe the options provided
    // by the user of this element
    emitter.on(`frameReady`, () => emitter.updateOptions({ options }))
    // wait for a formLoaded message and then set the form to have loaded
    emitter.on(`formLoaded`, () => setLoaded(true))
    // listen for resize events and resize the iframe to match the size of the content
    emitter.on(`resize`, ({ frame: { height } }) =>
      setStyle({ ...style, height })
    )

    if (form) {
      // listen to a hijacked form and use it to trigger a form submission
      form.hijack(() => emitter.submitForm())

      // listen to a resourceCreated event and inject the resource ID and submit the form.
      emitter.on(`resourceCreated`, ({ data }) => {
        form.inject(`gr4vy_resource_type`, data.resource_type)
        form.inject(`gr4vy_resource_id`, data.resource_id)
        form.submit()
      })
    }

    // allow the component user to subscribe to cross-frame events by providing
    // an onEvent handler
    emitter.subscribe(`formUpdate`, options.onEvent)
    emitter.subscribe(`resourceCreated`, options.onEvent)
    emitter.subscribe(`apiError`, options.onEvent)

    // set a timeout to check for changes
    setTimeout(() => {
      setTimedOut(true)
    }, options.timeout)
  }, [])

  // When we reach the timeout, check if the form is loaded and if not throw an error.
  useEffect(() => {
    if (loaded || !timedOut) {
      return
    }
    options.onEvent(`timeoutError`, { message: `Embedded form timed out` })
  }, [loaded, timedOut])

  return <View url={url} loaded={loaded} valid={valid} style={style} />
}

export default Frame
