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
root.style.maxWidth = '500px'

form.appendChild(root)
form.appendChild(input)

const result = document.createElement(`div`)

document.body.appendChild(form)
document.body.appendChild(result)

// If a host is explicitly set, ignore the gr4vyId
const instance = {
  ...(process.env.API_HOST || !process.env.GR4VY_ID
    ? {
        iframeHost: process.env.IFRAME_HOST ?? '127.0.0.1:8080',
        apiHost: process.env.API_HOST ?? '127.0.0.1:3100',
      }
    : {
        gr4vyId: process.env.GR4VY_ID,
      }),
}

setup({
  element: `#root`,
  form: `#form`,
  intent: 'capture',
  amount: 1299,
  currency: `GBP`,
  buyerExternalIdentifier: 'user-002',
  // buyerId: '0b44e891-c9e9-4f04-a14e-b2dc4613573f',
  ...instance,
  token: process.env.TOKEN ?? `123456`,
  debug: false,
  onEvent: log,
  theme: {
    fonts: {
      body: 'google:Lato',
    },
    colors: {
      primary: 'blue',
      // danger: 'red',
      // dangerBackground: 'pink',
      focus: 'orange',
    },
    radii: {
      input: 'subtle',
      container: 'subtle',
    },
  },

  billingAddressFields: {
    // address: {
    //   houseNumberOrName: true,
    //   line1: true,
    //   line2: true,
    //   city: true,
    //   postalCode: true,
    //   state: true,
    //   country: true,
    // },
    // taxId: true,
  },
  environment: 'sandbox',
  country: 'GB',
  display: 'all',
  metadata: {
    foo: 'bar',
  },
  // cartItems: [
  //   {
  //     name: 'Aloe',
  //     unitAmount: 5540,
  //     quantity: 1,
  //     sku: 'aloe',
  //   },
  // ],
  // locale: 'en-GB',
  requireSecurityCode: true,
  // overrides form submission
  onComplete: (transaction) => {
    result.innerHTML = `
      <p>Transaction ID: ${transaction.id}</p>
      <p>Status: ${transaction.status}</p>
      <p>Payment Method ID: ${transaction.paymentMethod?.id}</p>
      `
  },
  secure: true,
  showDeleteButton: true,
})
