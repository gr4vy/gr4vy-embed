import ReactDOM from 'react-dom'
import Gr4vy from '..'

/**
 * Simple entry point for the dev server. This is loaded when
 * running `yarn dev` or `yarn start`.
 */

const log = (key, payload) => {
  console.debug(`Merchant page received ${key}`, payload)
  if (key === `resourceCreated`) {
    alert(
      `Resource created: ${payload.data.resource_type}:${payload.data.resource_id}`
    )
  }
}

// add a root element, as React throws warnings when directly attached to the body
const root = document.createElement(`div`)
root.setAttribute(`id`, `root`)
document.body.appendChild(root)

ReactDOM.render(
  <div>
    <Gr4vy
      flow={[`authorize`, `capture`, `store`]}
      amount={1299}
      currency="USD"
      iframeHost="localhost:8080"
      apiHost="localhost:3100"
      bearerToken="123456"
      showButton
      debug="debug"
      onEvent={log}
      externalIdentifier="user-123"
    />
  </div>,
  document.querySelector(`#root`)
)
