import React, { useState, useLayoutEffect, useContext } from 'react'
import PropTypes from 'prop-types'

import View, { defaultStyle } from './View'
import Logger from './Logger'
import Emitter from './Emitter'

import { frameUrl, validate } from './functions'
import { FormContext } from '../../contexts/FormContext'

/**
 * Loads the embedded Gr4vy UI through an iFrame.
 * 
 * Starts by showing a loader, and then sends a message to the
 * embedded frame to initialize it. Once it receives the loaded message
 * it resizes the iframe and shows it to the user.
 */
const Frame = (options) => {
  // validate that all required options are present, in the right format,
  // type, etc
  const valid = validate(options)
  // keep the state of the UI to determine if the frame can be shown
  const [loaded, setLoaded] = useState(false)
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
    emitter.on(`resize`, ({ frame: { height }}) => setStyle({...style, height }))

    if (form) {
      // listen to a hijacked form and use it to trigger a form submission
      form.hijack(() => emitter.submitForm())
      // listen to a resourceCreated event and inject the resource ID and submit the form.
      emitter.on(`resourceCreated`, ({ data }) => {
        form.inject(`resource_type`, data.resource_type)
        form.inject(`resource_id`, data.resource_id)
        form.submit()
      })
    }

    // allow the component user to subscribe to cross-frame events by providing
    // an onEvent handler
    emitter.subscribe(`formUpdate`, options.onEvent)
    emitter.subscribe(`resourceCreated`, options.onEvent)
    emitter.subscribe(`apiError`, options.onEvent)
  }, [])

  return <View 
    url={url} 
    loaded={loaded} 
    valid={valid}
    style={style} 
  />
}

Frame.propTypes = {
  // determines what API calls to make 
  flow: PropTypes.arrayOf(PropTypes.string).isRequired,
  // the JWT access token used to authenticate the API
  bearerToken: PropTypes.string.isRequired,
  // the hostname and port of the API server to use
  apiHost: PropTypes.string.isRequired,
  // the hostname and port of the server that hosts the embedded UI
  iframeHost: PropTypes.string.isRequired,

  // the amount of a given currency to charge, must be used when authorize
  // or capture have been set for the flow option
  amount: PropTypes.number,
  // the currency to charge the amount in, must be used when authorize
  // or capture have been set for the flow option
  currency: PropTypes.string,
  // wether to show a submit button in the embedded frame
  showButton: PropTypes.bool,
  // a development option that allows sending a `Prefer` header to force a 
  // certain API response from dev servers
  preferResponse: PropTypes.string,
  // wether to output any debug messages. Must be set to `log` or `debug`.
  debug: PropTypes.string,
  // a callback function that's used to subscribe to events
  onEvent: PropTypes.func
}

Frame.defaultProps = {
  // defaults to all flow features
  flow: [`authorize`, `capture`, `store`],
  // defaults to hidding the button
  showButton: false
}

export default Frame
