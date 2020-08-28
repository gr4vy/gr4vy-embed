import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import FormNapper from 'form-napper'

const FormContext = createContext()

/**
 * Defines a new form context, used for interacting with a surrounding form
 */
const FormProvider = ({
  container,
  children
}) => {
  const form = new FormNapper(container)

  return (
    <FormContext.Provider value={form}>
      { children }
    </FormContext.Provider>
  )  
}

FormProvider.propTypes = {
  container: PropTypes.instanceOf(Element).isRequired,
  children: PropTypes.node.isRequired
}

export { FormProvider, FormContext }
