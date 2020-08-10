import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import framebus from 'framebus'

import View, { defaultStyle } from './View'

const Frame = ({
  hostname
}) => {
  const [loaded, setLoaded] = useState(false)
  const [style, setStyle] = useState(defaultStyle)

  const url = new URL(`http://${hostname}`)
  url.searchParams.set(`hostname`, hostname)

  useEffect(() => {
    framebus.on(`loaded`, ({ loaded }) => {
      console.log(loaded)
      setLoaded(loaded)
    })
    framebus.on(`resize`, ({ frame }) => {
      console.log(frame)
      setStyle({...style, height: frame.height })
    })
  }, [])

  return <View 
    url={String(url)} 
    loaded={loaded} 
    style={style} 
  />
}

Frame.propTypes = {
  hostname: PropTypes.string.isRequired
}

export default Frame
