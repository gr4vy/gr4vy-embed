import React from 'react'
import PropTypes from 'prop-types'

import { frame, iframe, loader } from './style.scss'
import icon from './loader.svg'

const defaultStyle = { width: `100%`, height: `100px` }

const View = ({
  url,
  loaded,
  style
}) => (
  <div className={frame}> 
    <div 
      className={loader}
      data-loaded={loaded}
    >
      <img className={style.icon} src={icon} />
    </div>
    <iframe 
      className={iframe}
      data-loaded={loaded}
      src={url}
      frameBorder={0}
      scrolling='no'
      title='Secure Payment Method Frame'
      style={style}
    ></iframe>
  </div>
)


View.propTypes = {
  url: PropTypes.string.isRequired,
  loaded: PropTypes.bool.isRequired,
  style: PropTypes.object.isRequired
}

View.defaultProps = {
  loaded: false,
  style: defaultStyle
}


export default View
export { defaultStyle }