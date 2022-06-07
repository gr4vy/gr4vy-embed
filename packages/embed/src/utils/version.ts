type Package = 'embed' | 'embed-ui'

declare const PACKAGE_VERSION: string

declare global {
  interface Window {
    gr4vy?: {
      version?: Partial<Record<Package, string>>
    }
  }
}

export const setVersion = (pkg: Package, ver = PACKAGE_VERSION) => {
  if (!window.gr4vy) {
    window.gr4vy = { version: {} }
  }

  window.gr4vy.version = { [pkg]: ver }
}
