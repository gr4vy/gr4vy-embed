// CSS should not be referenced outside of a document
if (typeof document === 'undefined') {
  throw 'Referencing CSS using webpack style-loader is not supported with SSR'
}
