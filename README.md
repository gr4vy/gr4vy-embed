# Gr4vy Embed for React

![Active project](https://img.shields.io/badge/status-active-brightgreen)

Quickly embed a credit card form in your React app and store the card details, authorize the card, and capture a transaction. 

![Card Form](./docs/images/card_form.png)

Visit [Gr4vy.com](https://gr4vy.com) for more details.

## Usage

This project is currently hosted in GitHub and therefore can only be installed with those who have access to this repository.

To add GitHub's package repository, add a `.npmrc` file to your project 
with the following content.

```sh
registry=https://npm.pkg.github.com/gr4vypop
```

Then, via the command line, install this package as follows.

```bash
npm install @gr4vypop/embed-react --save-prod
# yarn add @gr4vypop/embed-react --save
```

## Get started

This project exposes a simple integration that allows a Gr4vy form
to be embeded in any React UI.

The integration takes all the fields needed to make an API call directly.

```js
import React from 'react'
import ReactDOM from 'react-dom'

import Gr4vy from '@gr4vypop/embed-react'

ReactDOM.render(
  <Gr4vy 
    flow={['authorize', 'capture', 'store']}
    amount={1299}
    currency={'USD'}
    frameHost='127.0.0.1:8080'
    apiHost='127.0.0.1:3100'
    bearerToken='JWT_TOKEN'
    showButton
    debug='debug'
  />,
  document.getElementById(`app`)
)
```

The options for this integration are as follows.

| Field         | Default                     | Description                                                                                                                                                                                                                                                          |
| ------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `amount`      | `null`                      | The amount to authorize or capture in the specified `currency`. Not required if the `flow` is set to `store` only.                                                                                                                                                   |
| `apiHost`     | `null`                      | **Required** - The host (both hostname and port) of the Gr4vy API server to use.                                                                                                                                                                                     |
| `bearerToken` | `null`                      | **Required** - The server-side generated JWT token used to authenticate any of the API calls.                                                                                                                                                                        |
| `currency`    | `null`                      | A valid, active, 3-character `ISO 4217` currency code to authorize or capture the `amount` for.                                                                                                                                                                      |
| `flow`        | `authorize, capture, store` | Controls the behaviour of the integration, defining if it should perform an authorization, as well as a capture, and if the card should be stored. Both `authorize` and `store` could be performed without the others. `capture` requires `authorize` to be present. |
| `frameHost`   | `null`                      | **Required** - The host (both hostname and port) of the server that hosts the Gr4vy payment form.                                                                                                                                                                               |
| `showButton`  | `false`                     | Setting this value to `true` will show a **Submit** button within the UI. This is useful when the UI around this element does not contain a button                                                                                                                   |

## Development

To get started with this project, follow these steps.

### Preparation

To get started, clone the project and install the required dependencies. This
project relies on the `yarn` package manager.

```sh
git clone git@github.com:gr4vypop/embed-react.git
cd embed-react
# npm i -g yarn
yarn install
``` 

### Development Server & Storybook

To run the local development server, tests, and storybook, you can simply run the following command.

```sh
yarn dev
```

This will open a development preview on http://localhost:8081/ and the Storybook UI on http://localhost:6007/.

You could also run these commands individually as follows.

```sh
yarn start
yarn test:watch
yarn storybook
```

> **Note:** By default `yarn start` will open on http://localhost:8081/ yet you will only see a spinner. The reason for this is that this page expect the iframe to be loaded on the `frameHost` domain and is waiting for a cross-frame message to initialize the UI. Use this page in combination with the `embedded-components` package to spin up an iframe instance.

### Local testing and linting

Tests and linting are provided by a mix of `jest`, `storybook` and `eslint`. Storybook is used to check if the UI has changes since it last recorded a snapshot. 

```sh
yarn test
yarn lint
```

To update snapshots (after you've validated that the changes are desirable) you can run `yarn test -u`. To run tests continuously and watch for changes, the `yarn test:watch` command is available.

> **Note:** We try to keep a coverage of a 100%. Run the `yarn test:watch` command to see more details on our current coverage level. Missed lines can be explored by opening the `coverage/index.html` file after a test has been run.


### Development with Docker

Alternatively, you can use Docker to run the local dev server without the need to install Node, Yarn, and any of the other
dependencies.

```sh
docker-compose up
```

### CI/CD & Publishing

We use GitHub Actions to automatically test and lint our code, as well as control the publishing of new versions 
of the package.

To publish a new version, simply run:

```sh
yarn release
```

This command will ask for a new version number, update the `package.json`, and then push a new tag for 
that version. GitHub Actions then picks up the new tag and publishes it as a new package to GitHub's
pacakage registry.

### Project layout

This projects folder structure is as follows.

```yaml
- .github/
  - workflows/ # GitHub actions for CI/CD
- .storybook/ # Configuration for Storybook
- docs/ # Additional documentation resources
- src/
  - components/ 
    - Frame/ # All the UI for the wrapper that loads the iFrame
      - index.js # The controler for the Frame, this controls behaviour and not what is displayed
      - View.js # The view for the Frame, this controls what is displayed, and not the behaviour
      - functions.js # A list of helper functions used by the controller
      - style.css # Styling for the UI, mostly to style to loader
      - loaders.svg # An animated SVG loader, shown while the page loads
      - Emitter/ # A helper class used to communicate with the parent frame
      - Logger # A helper class used to output debug statements to the console
- stories/ # Storybook stories
- tests/ # Tests, test configuration, and snapshots
- webpack/ # Configuration for Webpack, the tool used to transpile the source into a single file
```

## License

This project is provided as-is under the [MIT license](LICENSE).
