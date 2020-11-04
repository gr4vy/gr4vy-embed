import React from 'react'
import PropTypes from 'prop-types'

import css from './style.module.scss'
import icon from './loader.svg'

const defaultStyle = { width: `100%`, height: `100px` }

const View = ({
  url,
  loaded,
  valid,
  style
}) => (
  <>
    { valid && (
      <div className={css.frame}>
        <div
          className={css.loader}
          data-loaded={loaded}
        >
          <img className={css.icon} src={icon} />
        </div>
        <iframe
          className={css.iframe}
          data-loaded={loaded}
          src={url}
          frameBorder={0}
          scrolling='no'
          title='Secure Payment Method Frame'
          style={style}
        ></iframe>
      </div>
    )}
  </>
)


View.propTypes = {
  url: PropTypes.string.isRequired,
  loaded: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  style: PropTypes.object.isRequired
}

View.defaultProps = {
  loaded: false,
  style: defaultStyle
}


export default View
export { defaultStyle }