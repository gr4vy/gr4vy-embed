import { setup } from '@gr4vy/embed'

setup({
  element: 'body',
  form: null,
  intent: 'capture',
  amount: 1299,
  currency: 'USD',
  iframeHost: '127.0.0.1:8080',
  apiHost: '127.0.0.1:3100',
  token: '123456',
  showButton: false,
  debug: true,
  onEvent: console.log,
  externalIdentifier: 'user-123',
})
