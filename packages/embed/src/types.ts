export type Config = {
  element: string | HTMLElement | Element // The element to insert the integration at
  form?: string | HTMLElement | Element // The form to bind the integration to
  amount: number // The amount of a given currency to charge
  intent?: 'authorize' | 'capture' | 'approve' // Defines the intent of this API call. This determines the desired initial state of the transaction.
  currency: string // Currency to charge the amount in
  iframeHost: string // the hostname and port of the server that hosts the embedded UI
  apiHost: string // the hostname and port of the API server to use
  bearerToken: string // the JWT access token used to authenticate the API
  showButton?: boolean // wether to show a submit button in the embedded frame
  debug?: boolean // wether to output any debug messages.
  onEvent?: (eventName: string, data: any) => void // a callback function that's used to subscribe to events
  externalIdentifier?: string // an optional external identifier
  preferResponse?: string // a development option that allows sending a `Prefer` header to force a certain API response from dev servers
  buyerId?: string // the ID of the buyer to associate the payment methods to
  buyerExternalIdentifier?: string // the external ID of the buyer to associate the payment methods to
}
