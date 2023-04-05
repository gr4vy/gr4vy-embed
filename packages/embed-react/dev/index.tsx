import React from 'react'
import ReactDOM from 'react-dom'
import Embed from '../src'

ReactDOM.render(
  <Embed
    intent="capture"
    amount={1299}
    currency="USD"
    iframeHost={process.env.IFRAME_HOST ?? '127.0.0.1:8080'}
    apiHost={process.env.API_HOST ?? '127.0.0.1:3100'}
    token="123456"
    debug
    country="US"
    onEvent={console.log}
    locale="en"
  />,
  document.querySelector('#app')
)
