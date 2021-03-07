# Gr4vy Embed

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

Quickly embed Gr4vy in your Node app to store card details,
authorize payments, and capture a transaction. Gr4vy Embed provides a few
different ways to integrate.

- Use [`@gr4vy/embed`](./packages/embed) in a non-React application.
- Use [`@gr4vy/embed-react`](./packages/embed-react) in a React application.

## Development

To get started with this project, follow these steps.

### Preparation

To get started, clone the project and install the required dependencies. This
project relies on the `yarn` package manager. Additionally this is a monorepo
that depends on `yarn` workspaces and lerna to manage multiple packages

```sh
git clone git@github.com:gr4vy/embed.git
cd embed
# npm i -g yarn
yarn config set workspaces-experimental true
yarn setup
```

### Development Server

To run the local development server for all projects run the following command
at the root of the project.

```sh
yarn dev
```

This will open a development preview of Gr4vy Embed and the React component.

> **Note:** By default `yarn dev` will open on http://localhost:8081/ yet you
> will not see anything. The reason for this is that this page expect the iframe to be
> loaded on the `frameHost` domain and is waiting for a cross-frame message to
> initialize the UI. Use this page in combination with the `embedded-components`
> package to spin up an iframe instance.

### Local testing and linting

Tests and linting are provided by a mix of `jest`, `eslint` and `prettier`.

```sh
yarn lint
yarn test
```

> **Note:** We try to keep a coverage of a 100%. Run the `yarn test` command to
> see more details on our current coverage level. Missed lines can be explored
> by opening the `coverage/index.html` file after a test has been run.

## License

This project is provided as-is under the [MIT license](LICENSE).
