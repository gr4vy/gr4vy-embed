import React from 'react'
import ReactDOM from 'react-dom'
import Gr4vy from '../'

/**
 * Setup function for the UMD version of our integration.
 * 
 * Requires a valid querySelector query representing an HTML element 
 * to append the form to, and a list of valid options for the form.
 */
const setup = ({
  element,
  options
}) => {
  // try and get the container 
  const container = document.querySelector(element)
  
  // if no container was found, throw an error and return
  if (!container) {
    const error = {
      code: `argumentError`,
      argument: `element`,
      message: `${element} must be a valid HTML element`
    }

    console.error(`Gr4vy - Error`, error)
    options?.onEvent?.(`argumentError`, error)
    return
  }

  // Use react to bind the form to to the container
  ReactDOM.render(
    <Gr4vy {...options} />,
    container
  )
}

export { setup } 