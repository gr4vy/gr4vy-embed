# Gr4vy Embed

![NPM Version](https://img.shields.io/npm/v/@gr4vy/embed?color=green&style=for-the-badge)
![License](https://img.shields.io/npm/l/@gr4vy/embed?style=for-the-badge)

Quickly embed Gr4vy in your Node app to store card details,
authorize payments, and capture a transaction.

Use [`@gr4vy/embed-react`](../embed-react) in a React application.

## Usage

Via the command line, install this package as follows.

```bash
npm install @gr4vy/embed --save-prod
# yarn add @gr4vy/embed --save
```

## Get started

To use Gr4vy Embed, import the library and call the `.setup()` method.

```js
const { setup } = require(`@gr4vy/embed`)
// import { setup } from (`@gr4vy/embed`)

setup({
  element: '.container',
  form: '#cardform',
  amount: 1299,
  currency: 'USD',
  iframeHost: '127.0.0.1:8080',
  apiHost: '127.0.0.1:3100',
  token: '...',
})
```

### Element & Form

Gr4vy Embed expects the query for two HTML elements to attach itself to. The
values for these elements are a query string that can be parsed by
`document.querySelector`. For example,
`<div class="container" />` would be represented as `.container`, while
`<form id="cardform">` would be represented by `#cardform`.

| HTML Element | Example      | Description                                                                                                                                                                                       |
| ------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `element`    | `.container` | Specifies the HTML element to attach the form to. Gr4vy Embed will insert the form at this location. This parameter also supports directly providing a HTML element.                              |
| `form`       | `#order`     | Specifies the HTML `<form>` element or a query for the element to attach additional inputs to. Gr4vy will automatically insert a hidden Input field into this form containing the transaction ID. |

### Options

The options for this integration are as follows.

| Field                     | Default     | Description                                                                                                                                                                                                                                          |
| ------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `amount`                  | `null`      | The amount to authorize or capture in the specified `currency`. only.                                                                                                                                                                                |
| `apiHost`                 | `null`      | **Required** - The host (both hostname and port) of the Gr4vy API server to use. Can be omitted when using the `gr4vyId` option.                                                                                                                     |
| `token`                   | `null`      | **Required** - The server-side generated JWT token used to authenticate any of the API calls.                                                                                                                                                        |
| `intent`                  | `authorize` | `authorize`, `capture`, `approve` - Defines the intent of this API call. This determines the desired initial state of the transaction.                                                                                                               |
| `currency`                | `null`      | A valid, active, 3-character `ISO 4217` currency code to authorize or capture the `amount` for.                                                                                                                                                      |
| `iframeHost`              | `null`      | **Required** - The host (both hostname and port) of the server that hosts the Gr4vy payment form. Can be omitted when using the `gr4vyId` option.                                                                                                    |
| `showButton`              | `false`     | Setting this value to `true` will show a **Submit** button within the UI. This is useful when the UI around this element does not contain a button                                                                                                   |
| `onEvent`                 | `null`      | An optional event handler to bind to the form. This is called for various events, more on that below.                                                                                                                                                |
| `externalIdentifier`      | `null`      | An optional external identifier that can be supplied. This will automatically be associated to any resource created by Gr4vy and can subsequently be used to find a resource by that ID                                                              |
| `buyerId`                 | `null`      | An optional ID for a Gr4vy buyer. The transaction will automatically be associated to a buyer with that ID. If no buyer with this ID exists then it will be ignored.                                                                                 |
| `buyerExternalIdentifier` | `null`      | An optional external ID for a Gr4vy buyer. The transaction will automatically be associated to a buyer with that external ID. If no buyer with this external ID exists then it will be ignored. This option is ignored if the `buyerId` is provided. |
| `store`                   | `ask`       | `'ask'`, `true`, `false` - Explicitly store the payment method or ask the buyer, this is used when a buyerId or buyerExternalIdentifier is provided.                                                                                                 |
| `country`                 | `null`      | **Required** A valid `ISO 3166` country code.                                                                                                                                                                                                        |
| `gr4vyId`                 | `null`      | Gr4vy ID automatically sets the `apiHost` to `api.<gr4vyId>.gr4vy.app` and `iframeHost` to `embed.<gr4vyId>.gr4vy.app`.                                                                                                                              |
| `theme`                   | `null`      | Theme customisation options (See Theming)                                                                                                                                                                                                            |

### Theming

Theming currently supports setting a custom font. This includes system fonts and Google fonts (with a `google:` prefix)

```js
{
  fonts: {
    body: 'google:Lato' // Fonts will automatically be loaded from Google
  }
}
```

This feature will benefit from browser caching if your page loads the same font from the Google CDN.

### Events

The `onEvent` option can be used to listen to certain events emitted from the form.

```js
setup({
  element: '.container',
  ...,
  onEvent: (name, data) => {
    ...
  }
})
```

Currently, we Gr4vy Embed emits the following events.

#### `agumentError`

Returned when the initial input (`element`, `options`) are incorrectly formatted or missing.

```json
{
  "code": "argumentError",
  "option": "currency",
  "message": "must be a valid number"
}
```

#### `formUpdate`

Returned when the form updates. Currently this only informs the developer if the form
is valid.

```json
{
  "valid": false
}
```

#### `transactionCreated`

Returns a full transaction object when the transaction was successfully created.

```json
{
  "type": "transaction",
  "id": "8724fd24-5489-4a5d-90fd-0604df7d3b83",
  "status": "pending",
  ...
}
```

#### `apiError`

Returned when the form encounters an API error.

```json
{
  "type": "error",
  "code": "unauthorized",
  "status": 401,
  "message": "No valid API authentication found",
  "details": []
}
```

## License

This project is provided as-is under the [MIT license](LICENSE).
