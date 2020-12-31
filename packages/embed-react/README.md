# Gr4vy Embed for React

![NPM Version](https://img.shields.io/npm/v/@gr4vy/embed-react?color=green&style=for-the-badge)
![License](https://img.shields.io/npm/l/@gr4vy/embed-react?style=for-the-badge)

Quickly embed Gr4vy in your React app to store card details,
authorize payments, and capture a transaction.

Use [`@gr4vy/embed`](https://www.npmjs.com/package/@gr4vy/embed-react) in
a non-React application.

## Usage

Via the command line, install this package as follows.

```bash
npm install @gr4vy/embed-react --save-prod
# yarn add @gr4vy/embed-react --save
```

## Get started

To use Gr4vy Embed, import the `Gr4vyEmbed` component.

```js
const Gr4vyEmbed = require(`@gr4vy/embed-react`)
// import Gr4vyEmbed from (`@gr4vy/embed-react)

<Gr4vyEmbed
  amount={1299}
  currency='USD'
  frameHost='127.0.0.1:8080'
  apiHost='127.0.0.1:3100'
  bearerToken='...'
/>
```

### Options

The options for this integration are as follows.

| Field                     | Default | Description                                                                                                                                                                                                                                          |
| ------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `amount`                  | `null`  | The amount to authorize or capture in the specified `currency`. only.                                                                                                                                                                                |
| `apiHost`                 | `null`  | **Required** - The host (both hostname and port) of the Gr4vy API server to use.                                                                                                                                                                     |
| `bearerToken`             | `null`  | **Required** - The server-side generated JWT token used to authenticate any of the API calls.                                                                                                                                                        |
| `capture`                 | `true`  | Controls the behaviour of the integration, defining if it should perform an authorization, as well as a capture                                                                                                                                      |
| `currency`                | `null`  | A valid, active, 3-character `ISO 4217` currency code to authorize or capture the `amount` for.                                                                                                                                                      |
| `frameHost`               | `null`  | **Required** - The host (both hostname and port) of the server that hosts the Gr4vy payment form.                                                                                                                                                    |
| `showButton`              | `false` | Setting this value to `true` will show a **Submit** button within the UI. This is useful when the UI around this element does not contain a button                                                                                                   |
| `onEvent`                 | `null`  | An optional event handler to bind to the form. This is called for various events, more on that below.                                                                                                                                                |
| `externalIdentifier`      | `null`  | An optional external identifier that can be supplied. This will automatically be associated to any resource created by Gr4vy and can subsequently be used to find a resource by that ID                                                              |
| `buyerId`                 | `null`  | An optional ID for a Gr4vy buyer. The transaction will automatically be associated to a buyer with that ID. If no buyer with this ID exists then it will be ignored.                                                                                 |
| `buyerExternalIdentifier` | `null`  | An optional external ID for a Gr4vy buyer. The transaction will automatically be associated to a buyer with that external ID. If no buyer with this external ID exists then it will be ignored. This option is ignored if the `buyerId` is provided. |

### Events

The `onEvent` option can be used to listen to certain events emitted from the form.

```js
<Gr4vyEmbed
  amount={1299}
  currency='USD'
  onEvent={(name, data) => {...}}
  ...
/>
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
  "details": [ ]
}
```

## License

This project is provided as-is under the [MIT license](LICENSE).
