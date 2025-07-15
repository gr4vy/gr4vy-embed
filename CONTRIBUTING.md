# Contributing

To get started with this project, follow these steps.

## Preparation

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

## Development Server

To run the local development server for all projects run the following command
at the root of the project.

```sh
yarn dev
```

This will open a development preview of Gr4vy Embed and the React component.

> **Note:** By default `yarn dev` will open on http://localhost:8081/ yet you
> will not see anything. The reason for this is that this page expects the
> Embed UI to be running on http://localhost:8080/. Please see the [Embed
> UI](https://github.com/gr4vy/embed-ui) project for more details.

## Accessibility

This project follows EAA compliance requirements, implementing [WCAG 2.1](https://www.w3.org/TR/WCAG21/) Level AA and [EN 301-549](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf) standards.
For detailed accessibility guidelines, see our [Web Accessibility](https://gr4vy.atlassian.net/wiki/spaces/GB/pages/1410727952/Web+Accessibility) documentation and [Frontend Coding Standards - Accessibility](https://gr4vy.atlassian.net/wiki/spaces/GB/pages/253657097/Frontend+Coding+Standards).

### Testing Tools

- [axe-core](https://github.com/dequelabs/axe-core-npm#readme) - Integrated with Playwright for page/frame-level audits
- [vitest-axe](https://github.com/chaance/vitest-axe) - Component-level testing in unit tests

Accessibility audits run locally and in CI

### Developer Guidelines

- Use semantic HTML where possible
- Ensure sufficient color contrast (4.5:1 minimum)
- Provide keyboard navigation support
- Include proper ARIA labels when needed
- Test with screen readers during development

## Local testing and linting

Tests and linting are provided by a mix of `jest`, `eslint` and `prettier`.

```sh
yarn lint
yarn test
```

> **Note:** We try to keep a coverage of a 100%. Run the `yarn test` command to
> see more details on our current coverage level. Missed lines can be explored
> by opening the `coverage/index.html` file after a test has been run.

## Releasing a PR

Raising a PR against the `main` branch will trigger Github actions. In order to produce a meaninful changelog, we use Auto https://intuit.github.io/auto/ to manage versioning and change logs. This allows us to edit the PR directly before merging.

### PR Titles

Auto will use the PR title as the message in the change log. This means it needs to be human readable and meaningful.
Try to avoid using ticket numbers or meta information - instead describe the value the change brings.

### Release notes

PR titles are limited in character length and you may need to provide more details. You can add a `## Release Notes` section for this.
Only this section will appear in the Change Log, not the entire body of the PR.

```md
## Release Notes

Write additional notes here...
```

### Labels

Labels inform what type of change has occured so that the correct semver number can be assigned for the release.

The following labels will increment the version number:

- `major` - 💥 Breaking Change (major)
- `minor` - 🚀 Enhancement (minor)
- `patch` - 🐛 Bug Fix (patch)
- `performance` - 🏎 Performance (patch)

The following labels will have no effect on the version:

- `internal` - 🏠 Internal (no version)
- `documentation` - 📝 Documentation (no version)
- `test`- 🧪 Tests (no version)
- `dependencies` - 🔩 Dependency Updates (no version)

Finally, to trigger a release you must include the release label:

- `release` - Create a release when PR is merged
