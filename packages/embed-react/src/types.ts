export type Props = {
  form?: HTMLElement // The form to bind the integration to
  amount: number // The amount of a given currency to charge
  capture?: boolean // A flag to determine if payment should be captured at the same time as authorization
  currency: string // Currency to charge the amount in
  iframeHost: string // the hostname and port of the server that hosts the embedded UI
  apiHost: string // the hostname and port of the API server to use
  bearerToken: string // the JWT access token used to authenticate the API
  showButton?: boolean // wether to show a submit button in the embedded frame
  debug?: boolean // wether to output any debug messages. Must be set to `log` or `debug`.
  onEvent?: (name: string, event: any) => void // a callback function that's used to subscribe to events
  externalIdentifier?: string // an optional external identifier
  preferResponse?: string // a development option that allows sending a `Prefer` header to force a certain API response from dev servers
  buyerId?: string // the ID of the buyer to associate the payment methods to
  buyerExternalIdentifier?: string // the external ID of the buyer to associate the payment methods to
}
