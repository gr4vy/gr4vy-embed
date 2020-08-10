import React from 'react'
import ReactDOM from 'react-dom'
import Gr4vy from '../src/'

ReactDOM.render(
  <div>
    <Gr4vy 
      url='http://127.0.0.1:8080' 
    />
  </div>,
  document.getElementById(`app`)
)
