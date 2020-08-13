import React from 'react'
import ReactDOM from 'react-dom'
import Gr4vy from '../'

const setup = ({
  element,
  options
}) => {
  const container = document.querySelector(element)
  ReactDOM.render(
    <Gr4vy {...options} />,
    container
  )
}

export { setup } 