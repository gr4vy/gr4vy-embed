import React, { useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import View, { defaultStyle } from './View'
import Logger from './Logger'
import Emitter from './Emitter'

const Frame = (options) => {
  const url = `http://${options.iframeHost}`

  const [loaded, setLoaded] = useState(true)
  const [style, setStyle] = useState(defaultStyle)

  const logger = new Logger({ options })
  const emitter = new Emitter({ logger, url })

  useLayoutEffect(() => {
    emitter.onFrameReady(() => emitter.updateOptions({ options }))
    emitter.onFormLoaded(() => setLoaded(true))
    emitter.onResize(height => setStyle({...style, height }))

    emitter.subscribe(`formUpdate`, options.onEvent)
    emitter.subscribe(`resourceCreated`, options.onEvent)
    emitter.subscribe(`apiError`, options.onEvent)
  }, [])

  return <View 
    url={url} 
    loaded={loaded} 
    style={style} 
  />
}

Frame.propTypes = {
  flow: PropTypes.arrayOf(PropTypes.string).isRequired,
  bearerToken: PropTypes.string.isRequired,
  apiHost: PropTypes.string.isRequired,
  iframeHost: PropTypes.string.isRequired,

  amount: PropTypes.number,
  currency: PropTypes.string,
  showButton: PropTypes.bool,
  preferResponse: PropTypes.string,
  debug: PropTypes.string,

  onEvent: PropTypes.func
}

Frame.defaultProps = {
  showButton: false,
  flow: [`authorize`, `capture`, `store`],
  onEvent: () => {}
}

export default Frame
