import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import framebus from 'framebus'

const Component = ({
  url
}) => {
  const [style, setStyle] = useState({ 
    width: `100%` 
  })
  

  useEffect(() => {
    framebus.on(`onLoad`, (data) => {
      setStyle(s => ({...s, height: data.frameHeight }))
    })
  }, [])

  return (
    <iframe 
      src={url}
      frameBorder={0}
      scrolling='no'
      title='Secure Payment Method Frame'
      style={style}
    >
      
    </iframe>
  )
}

Component.propTypes = {
  url: PropTypes.string.isRequired
}

export default Component
