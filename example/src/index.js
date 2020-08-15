import React from 'react'
import ReactDOM from 'react-dom'
import Gr4vy from '@gr4vy/embed'

ReactDOM.render(
  <Gr4vy 
    flow={[`authorize`, `capture`, `store`]}
    amount={1299}
    currency={`USD`}
    apiHost='localhost:3100'
    iframeHost='localhost:8080'
    bearerToken='JWT_TOKEN'
    showButton
    debug='debug'
  />,
  document.getElementById(`app`)
)
