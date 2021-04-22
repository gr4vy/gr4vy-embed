export type Config = {
  element: string | HTMLElement | Element // The element to insert the integration at
  form?: string | HTMLElement | Element // The form to bind the integration to
  amount: number // The amount of a given currency to charge
  intent?: 'authorize' | 'capture' | 'approve' // Defines the intent of this API call. This determines the desired initial state of the transaction.
  currency: string // Currency to charge the amount in
  token: string // the JWT access token used to authenticate the API
  showButton?: boolean // wether to show a submit button in the embedded frame
  debug?: boolean // wether to output any debug messages.
  onEvent?: (eventName: string, data: any) => void // a callback function that's used to subscribe to events
  externalIdentifier?: string // an optional external identifier
  preferResponse?: string // a development option that allows sending a `Prefer` header to force a certain API response from dev servers
  buyerId?: string // the ID of the buyer to associate the payment methods to
  buyerExternalIdentifier?: string // the external ID of the buyer to associate the payment methods to
  environment?: 'development' | 'staging' | 'production'
  store?: 'ask' | boolean
  country: string
  iframeHost: string
  apiHost: string
  theme?: ThemeOptions // Theming options
}

export type SetupConfig = Omit<Config, 'iframeHost' | 'apiHost'> & {
  gr4vyId?: string
  iframeHost?: string
  apiHost?: string
}

type BorderWidth = 'none' | 'thin' | 'thick' // maps to 0, 1, 2

type Radii = 'none' | 'subtle' | 'rounded' // maps to 0, 2, 4

type FontSize = 'small' | 'medium' | 'large' // maps to 0.875rem, 1rem, 1.125rem

export type ThemeOptions = {
  fonts?: {
    /**
     * System or a valid Google font that will be downloaded (should support weights 400,600 and 700)
     */
    body?: string
  }
  borderWidths?: {
    /**
     * Bounding boxes that are not inputs.
     */
    container?: BorderWidth
    /**
     * Inputs, Radios and Checkbox borders
     */
    input?: Omit<BorderWidth, 'none'>
    /**
     * Focus ring around interactive elements
     */
    focus?: Omit<BorderWidth, 'none'>
  }
  colors?: {
    /**
     * Used to highlight interactive elements/call-to-actions.
     */
    primary?: string
    /**
     * Text is set globally for all text, subtle is for hints.
     */
    text?: string
    subtleText?: string
    /**
     * Bounding boxes that are not input elements
     */
    containerBackgroundUnchecked?: string
    containerBackground?: string
    containerBorder?: string
    /**
     * Main page background
     */
    pageBackground?: string
    inputBorder?: string
    inputText?: string
    inputBackground?: string
    /**
     * Info is used for loading bars or displaying information.
     */
    info?: string
    infoBackground?: string
    /**
     * Danger is used for error messages and destructive actions
     */
    danger?: string
    dangerBackground?: string
    /**
     * Focus ring around interactive elements
     */
    focus?: string
  }
  radii?: {
    /**
     * Input Radii
     */
    input?: Radii
    /**
     * Bounding boxes that are not inputs.
     */
    container?: Radii
  }
  fontSize?: {
    /**
     * Base size of all fonts (relative to the user/browser default)
     * Screens less than the small screen breakpoint will automatically
     * reduce their font size.
     */
    body?: FontSize
  }
  ui?: {
    /**
     * Prevents the loading bar from being displayed
     */
    loadingStatusBar?: boolean
    /**
     * Spaces options apart from each other
     */
    gapBetweenOptions?: boolean
    /**
     * Dark mode will add white to a base hue instead of black.
     */
    darkMode?: boolean
    /**
     * Display an inline list of options, aligned without bounding boxes.
     */
    inline?: boolean
  }
}
