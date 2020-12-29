const path = require(`path`)
const { merge } = require(`webpack-merge`)
const common = require(`./common.js`)

const { name, version } = require(`../package.json`)
const filename = `${name.replace(`@`, ``).replace(`/`, `-`)}-${version}.js`

// Builds a version of the library suitable for deployment to our CDN.
module.exports = merge(common, {
  mode: `production`,
  output: {
    filename,
    path: path.resolve(`./umd`),
    libraryTarget: `umd`,
    library: `gr4vy`,
  },
  entry: path.resolve(`./src/umd/index.tsx`),
})
