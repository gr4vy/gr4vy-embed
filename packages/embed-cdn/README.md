# Gr4vy Embed bundled for CDN

![License](https://img.shields.io/badge/LICENSE-MIT-green?style=for-the-badge)

Quickly embed Gr4vy in any web site by loading it from a CDN as a single JS file.

Use [`@gr4vy/embed`](../embed) in a non-React application.

## Usage

Load the JS file into your HTML page as follows.

```html
<script src="https://cdn.{gr4vyId}.gr4vy.app/gr4vy-embed.js"></script>
```

> Please replace the `{gr4vyId}` with the name of your instance. Additionally,
> you can build the JS file yourself and host it on your own CDN. See
> instructions below.

## Get started

To use Gr4vy Embed, call the `gr4vy.setup()` method with the name of your
instance and the details for the transaction.

```html
<body>
  <form id="cardform">
    <div class="container"></div>
    <input type="submit" value="Pay" />
  </form>

  <script>
    gr4vy.setup({
      gr4vyId: '[GR4VY_ID]',
      token: '[TOKEN]',
      amount: 1299,
      currency: 'USD',
      country: 'US',
      element: '.container',
      form: '#cardform',
    })
  </script>
</body>
```

> **Note**: Replace `[GR4VY_ID]` and `[TOKEN]` with the ID of your instance
> and JWT access token. See any of our [server-side
> SDKs](https://github.com/gr4vy?q=sdk) for more details.

This will insert Gr4vy Embed into the specified container and use the submit
button to trigger the transaction.

For more information on the parameters that `gr4vy.setup()` expects, please
refer to the [documentation for the Node library](../embed/README.md).

## Local build

To build your own version of this library, download the repository, install the
dependencies, and call the `build` command.

```sh
git clone git@github.com:gr4vy/embed.git
cd embed/packages/embed-cdn
yarn install
yarn build
```

This will generate a CDN ready file at `./lib/gr4vy-embed.js`.

## License

This project is provided as-is under the [MIT license](LICENSE).
