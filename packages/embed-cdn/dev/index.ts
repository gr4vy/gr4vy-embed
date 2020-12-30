import { setup } from '../src'

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
  } else if (key === `timeoutError`) {
    alert(`Error: ${payload.message}`)
  }
}

// add a form so we can attach form-napper to it
const form = document.createElement(`form`)
form.setAttribute(`id`, `form`)
form.setAttribute(`action`, `http://example.com/submit`)

const input = document.createElement(`input`)
input.setAttribute(`type`, `submit`)
input.setAttribute(`value`, `Submit`)

// add a root element, as React throws warnings when directly attached to the body
const root = document.createElement(`div`)
root.setAttribute(`id`, `root`)

form.appendChild(root)
form.appendChild(input)

document.body.appendChild(form)

setup({
  element: `#root`,
  form: `#form`,
  capture: true,
  amount: 1299,
  currency: `USD`,
  iframeHost: `127.0.0.1:8080`,
  apiHost: `127.0.0.1:3100`,
  bearerToken: `123456`,
  showButton: false,
  debug: `debug`,
  onEvent: log,
  externalIdentifier: `user-123`,
})