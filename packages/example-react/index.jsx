import Gr4vy from '@gr4vy/embed-react'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <Gr4vy
    capture
    amount={1299}
    currency="USD"
    iframeHost="127.0.0.1:8080"
    apiHost="127.0.0.1:3100"
    bearerToken="123456"
    showButton
    debug="log"
    onEvent={console.log}
  />,
  document.querySelector('#app')
)
