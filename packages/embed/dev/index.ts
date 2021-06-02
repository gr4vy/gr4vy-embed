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
root.style.width = '500px'

form.appendChild(root)
form.appendChild(input)

document.body.appendChild(form)

setup({
  element: `#root`,
  form: `#form`,
  intent: 'capture',
  amount: 1299,
  currency: `USD`,
  iframeHost: process.env.IFRAME_HOST ?? '127.0.0.1:8080',
  apiHost: process.env.API_HOST ?? '127.0.0.1:3100',
  token: `123456`,
  showButton: false,
  debug: true,
  onEvent: log,
  theme: {
    fonts: {
      body: 'google:Lato',
    },
    colors: {
      primary: 'blue',
      danger: 'red',
      dangerBackground: 'pink',
      focus: 'orange',
    },
    radii: {
      input: 'subtle',
      container: 'subtle',
    },
  },
  environment: 'development',
  country: 'US',
})
