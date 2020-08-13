import React from 'react'
import ReactDOM from 'react-dom'
import Gr4vy from '..'

const log = (key, payload) => {
  console.debug(`Merchant page received ${key}`, payload)
  if (key === `resourceCreated`) {
    alert(`Resource created: ${payload.data.resource_type}:${payload.data.resource_id}`)
  }
}

ReactDOM.render(
  <div>
    <Gr4vy 
      flow={[`authorize`, `capture`, `store`]}
      amount={ 1299 }
      currency='USD'
      iframeHost='localhost:8080' 
      apiHost='localhost:3100' 
      bearerToken='123456'
      showButton
      debug='debug'
      onEvent={log}
    />
  </div>,
  document.body
)
