import React from 'react'
import ReactDOM from 'react-dom'
import Gr4vy from '../src/'

ReactDOM.render(
  <div>
    <Gr4vy 
      flow={[`authorize`, `capture`, `store`]}
      amount={ 1299 }
      currency='USD'
      hostname='127.0.0.1:8080' 
      bearerToken='123456'
      showButton
      debug='log'
    />
  </div>,
  document.getElementById(`app`)
)
