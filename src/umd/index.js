import React from 'react'
import ReactDOM from 'react-dom'
import Frame from '../components/Frame'
import { FormProvider } from '../contexts/FormContext'

import { argumentError } from './functions'

/**
 * Setup function for the UMD version of our integration.
 * 
 * Requires a valid querySelector query representing an HTML element 
 * to append the form to, and a list of valid options for the form.
 */
const setup = ({
  element,
  form = null,
  options
}) => {
  const container = document.querySelector(element)
  if (!container) { 
    return argumentError(`element`, `${element} must be a valid HTML element`, options)
  }

  let formContainer = null
  if (form) {
    formContainer = document.querySelector(form)
    if (!formContainer) {
      return argumentError(`form`, `${form} must be a valid HTML form`, options)
    }
  }

  // Use react to bind the form to to the container
  if (form) {
    ReactDOM.render(
      <FormProvider container={formContainer}>
        <Frame {...options} />
      </FormProvider>
      , container
    )
  } else {
    ReactDOM.render(
      <Frame {...options} />
      , container
    )
  }
}

export { setup } 