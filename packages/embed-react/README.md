# Gr4vy Embed for React

![NPM Version](https://img.shields.io/npm/v/@gr4vy/embed-react?color=green&style=for-the-badge)
![License](https://img.shields.io/npm/l/@gr4vy/embed-react?style=for-the-badge)

Quickly embed Gr4vy in your React app to store card details,
authorize payments, and capture a transaction.

Use [`@gr4vy/embed`](../embed) in a non-React application.

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
  gr4vyId='[GR4VY_ID]'
  token='[TOKEN]'
  amount={1299}
  currency='USD'
  country='US'
  form='#payment-form'
/>
```

> **Note**: Replace `[GR4VY_ID]` and `[TOKEN]` with the ID of your instance
> and JWT access token. See any of our [server-side
> SDKs](https://github.com/gr4vy?q=sdk) for more details.

### Form

Gr4vy Embed expects the query for a HTML form to attach itself to. The
values for this element is a query string that can be parsed by
`document.querySelector`. For example `<form id="cardform">` would be
represented by `#cardform`.

| HTML Element | Example  | Description                                                                                                                                                                                       |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `form`       | `#order` | Specifies the HTML `<form>` element or a query for the element to attach additional inputs to. Gr4vy will automatically insert a hidden Input field into this form containing the transaction ID. |

### Options

The options for this integration are as follows.

| Field                     | Default     | Description                                                                                                                                                                                                                                                                                                                               |
| ------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `amount`                  | `null`      | The amount to authorize or capture in the specified `currency`. only.                                                                                                                                                                                                                                                                     |
| `apiHost`                 | `null`      | **Sometimes required** - The host (both hostname and port) of the Gr4vy API server to use. Can be omitted when using the `gr4vyId` option.                                                                                                                                                                                                |
| `buyerExternalIdentifier` | `null`      | An optional external ID for a Gr4vy buyer. The transaction will automatically be associated to a buyer with that external ID. If no buyer with this external ID exists then it will be ignored. This option is ignored if the `buyerId` is provided.                                                                                      |
| `buyerId`                 | `null`      | An optional ID for a Gr4vy buyer. The transaction will automatically be associated to a buyer with that ID. If no buyer with this ID exists then it will be ignored.                                                                                                                                                                      |
| `country`                 | `null`      | **Required** A valid `ISO 3166` country code.                                                                                                                                                                                                                                                                                             |
| `currency`                | `null`      | **Required** A valid, active, 3-character `ISO 4217` currency code to authorize or capture the `amount` for.                                                                                                                                                                                                                              |
| `externalIdentifier`      | `null`      | An optional external identifier that can be supplied. This will automatically be associated to any resource created by Gr4vy and can subsequently be used to find a resource by that ID                                                                                                                                                   |
| `gr4vyId`                 | `null`      | **Often required** Gr4vy ID automatically sets the `apiHost` to `api.<gr4vyId>.gr4vy.app` and `iframeHost` to `embed.<gr4vyId>.gr4vy.app`.                                                                                                                                                                                                |
| `iframeHost`              | `null`      | **Sometimes required** - The host (both hostname and port) of the server that hosts the Gr4vy payment form. Can be omitted when using the `gr4vyId` option.                                                                                                                                                                               |
| `intent`                  | `authorize` | `authorize`, `capture` - Defines the intent of this API call. This determines the desired initial state of the transaction.                                                                                                                                                                                                               |
| `locale`                  | `en`        | An optional locale, this consists of a `ISO 639 Language Code` followed by an optional `ISO 3166 Country Code`, e.g. `en`, `en-gb` or `pt-br`.                                                                                                                                                                                            |
| `onEvent`                 | `null`      | An optional event handler to bind to the form. This is called for various events, more on that below.                                                                                                                                                                                                                                     |
| `store`                   | `ask`       | `'ask'`, `true`, `false` - Explicitly store the payment method or ask the buyer, this is used when a buyerId or buyerExternalIdentifier is provided.                                                                                                                                                                                      |
| `theme`                   | `null`      | Theme customisation options (See Theming)                                                                                                                                                                                                                                                                                                 |
| `token`                   | `null`      | **Required** - The server-side generated JWT token used to authenticate any of the API calls.                                                                                                                                                                                                                                             |
| `onComplete`              | `null`      | Callback with a transaction object. (Form submission must be handled manually)                                                                                                                                                                                                                                                            |
| `display`                 | `all`       | `all`, `addOnly`, `storedOnly`, `supportsTokenization` - Filters the payment methods to show stored methods only, new payment methods only or methods that support tokenization.                                                                                                                                                          |
| `customOptions`           | `null`      | List of custom options. e.g. `[{ label: 'Giftcard', method: 'giftcard', description: 'You will be asked for a giftcard code.', iconUrl: 'data:image/svg+xml,...'}]`                                                                                                                                                                       |
| `onCustomSubmit`          | `null`      | Callback when a custom payment option is selected and the form submitted.                                                                                                                                                                                                                                                                 |
| `metadata`                | `Object`    | An optional object of key/values for transaction metadata. All values should be a string.                                                                                                                                                                                                                                                 |
| `paymentSource`           | `null`      | `installment`, `recurring` - Can be used to signal that Embed is used to capture the first transaction for a subscription or an installment. When used, `store` is implied to be `true` and `display` is implied to be `supportsTokenization`. This means that payment options that do not support tokenization are automatically hidden. |
| `cartItems`               | `Array`     | An optional array of cart item objects, each object must define a `name`, `quantity`, and `unitAmount`.                                                                                                                                                                                                                                   |
| `statementDescriptor`               | `Object`     | An optional object with information about the purchase to construct the statement information the buyer will see in their bank statement. Please note support for these fields varies across payment service providers and underlying banks, so Gr4vy can only ensure a best effort approach for each supported platform. <br />As an example, most platforms will only support a concatenation of `name` and `description` fields, truncated to a length of 22 characters. <br />The object can contain `name`, `description`, `phone_number` and `url` keys, with string values. `phone_number` should be in E164 format. Gr4vy recommends avoiding characters outside the alphanumeric range and the dot (`.`) to ensure wide compatibility. |

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

#### `optionsLoaded`

Returned when options are loaded. Stored options include the `id`.

```json
[
  {
    "id": "...",
    "method": "card",
    "mode": "card"
  },
  {
    "method": "card",
    "mode": "card"
  }
]
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

Returns a full transaction object when Gr4vy accepted the transaction,
regardless of its status. Be aware that this can be a pending or declined
transaction. To track API failures please use the `transactionFailed` event.

```json
{
  "type": "transaction",
  "id": "8724fd24-5489-4a5d-90fd-0604df7d3b83",
  "status": "pending",
  ...
}
```

#### `transactionCancelled`

Returned when a buyer has explicitly cancelled a transaction, e.g. closing a popup or dismissing Apple Pay. This is currently not supported for 3-D Secure transactions
and should not be conflated with transaction being declined or an error occuring.

```json
{
  "type": "transactionCancelled"
}
```

#### `transactionFailed`

Returned when an API call fails to create a transaction due to a client or
server error. In other words, this event is raised when incorrect data (like an
invalid JWT) is passed to the Gr4vy API and a HTTP status code in the `4XX` or
`5XX` range is returned.

To catch failed or declined transactions due to
downstream issues with the payment service, please subscribe to the
`transactionCreated` event.

```json
{
  "type": "error",
  "code": "unauthorized",
  "status": 401,
  "message": "No valid API authentication found"
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

### Custom Form Submission

Embed will automatically submit the payment form with hidden inputs, this can be prevented using the `onComplete` callback.

```tsx
<Gr4vyEmbed
  amount={1299}
  currency='USD'
  onEvent={(name, data) => {...}}
  onComplete={(transaction) => {
    // Handle custom form submission
  }}
/>
```

### Submission without a Form

Embed does not require a form to be present, in order to access the `EmbedInstance` directly you can pass a ref. You should implement `onComplete` if you are choosing this option.

```tsx
import Gr4vyEmbed, { EmbedInstance } from '@gr4vy/embed-react';
import { useRef } from 'react';

const MyComponent = () => {
  const embed = useRef<EmbedInstance>();

  return <div>
    <Gr4vyEmbed ref={embed} {...}/>
    <button onClick={() => embed.current.submit()}>
  </div>

}

```

## Custom Options

Embed will render custom payment options if you need to integrate with existing checkouts. This will not trigger any processing by
embed and instead you will need to handle the form submission. You should implement `onComplete` if you are choosing this option.

```tsx
<Gr4vyEmbed
  // Provide a list of custom options
  customOptions={[
    {
      label: 'Giftcard',
      method: 'giftcard', // This should be a unique identifier for your custom option
      description: 'You will be asked to enter a giftcard',
      iconUrl: `data:image/svg+xml,...`, // This should be a data:image/svg+xml url
    }
  ]}
  // Handle the submit for a custom option
  onCustomSubmit={({ method: 'giftcard' }) => {
    console.log(`Paid by ${method}`);
  }}
/>
```

## License

This project is provided as-is under the [MIT license](LICENSE).
