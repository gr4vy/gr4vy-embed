import React from 'react'
import ReactDOM from 'react-dom'
import Embed from '../src'

ReactDOM.render(
  <Embed
    intent="capture"
    amount={1299}
    currency="USD"
    iframeHost={process.env.IFRAME_HOST ?? '127.0.0.1:8080'}
    apiHost={process.env.API_HOST ?? '127.0.0.1:3000'}
    token="123456"
    showButton
    debug
    country="US"
    onEvent={console.log}
  />,
  document.querySelector('#app')
)
