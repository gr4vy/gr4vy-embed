export type Config = {
  element: HTMLElement // The element to insert the integration at
  form?: Element // The form to bind the integration to
  amount: number // The amount of a given currency to charge
  intent?: 'authorize' | 'capture' | 'approve' // Defines the intent of this API call. This determines the desired initial state of the transaction.
  currency: string // Currency to charge the amount in
  token: string // the JWT access token used to authenticate the API
  debug?: boolean // wether to output any debug messages.
  onEvent?: (eventName: string, data: any) => void // a callback function that's used to subscribe to events
  externalIdentifier?: string // an optional external identifier
  buyerId?: string // the ID of the buyer to associate the payment methods to
  buyerExternalIdentifier?: string // the external ID of the buyer to associate the payment methods to
  environment?: 'production' | 'sandbox'
  store?: 'ask' | boolean
  country: string
  iframeHost: string
  iframeUrl: string
  apiUrl: string
  apiHost: string
  theme?: ThemeOptions // Theming options
  locale?: string //  < ISO 639 Language Code > - < ISO 3166 Country Code (optional) >
  display?: 'storedOnly' | 'addOnly' | 'all' | 'supportsTokenization'
  onComplete?: (transaction: Transaction) => void
  channel: string
  iframeSrc: string
  customOptions?: Array<CustomOption>
  onCustomSubmit?: ({ method }) => void
  metadata?: Record<string, string>
  paymentSource?: 'installment' | 'moto' | 'recurring'
  cartItems?: Array<CartItem>
  statementDescriptor?: StatementDescriptor
  secure?: boolean
  requireSecurityCode?: boolean
  popupTimeout?: number
  shippingDetailsId?: string
  connectionOptions?: Record<string, unknown>
  fullPageReturnUrl?: string
  redirectMode?: 'fallback' | 'fullPage'
  onBeforeTransaction?: (options: {
    metadata?: Record<string, string>
    externalIdentifier?: string
    shippingDetailsId?: string
  }) => Promise<{
    metadata?: Record<string, string>
    externalIdentifier?: string
    shippingDetailsId?: string
    token?: string
  }>
  showDeleteButton?: boolean
  merchantAccountId?: string
  billingAddressFields?: BillingAddressFields
  antiFraudFingerprint?: string
}

export type BillingAddressFields = {
  address?: {
    houseNumberOrName?: boolean
    line1?: boolean
    city?: boolean
    postalCode?: boolean
    state?: boolean
    country?: boolean
  }
  emailAddress?: boolean
  firstName?: boolean
  lastName?: boolean
  taxId?: boolean
}

export type CustomOption = {
  method: string
  label: string
  description?: string
  iconUrl?: string
}

export type Transaction = {
  id: string
  status: string
  paymentMethod?: { id?: string }
}

export type SetupConfig = Omit<
  Config,
  | 'iframeHost'
  | 'apiHost'
  | 'apiUrl'
  | 'iframeUrl'
  | 'channel'
  | 'element'
  | 'form'
  | 'iframeSrc'
> & {
  gr4vyId?: string
  iframeHost?: string
  apiHost?: string
  element: string | HTMLElement | Element
  form: string | HTMLElement | Element
  secure?: boolean
}

type BorderWidth = 'none' | 'thin' | 'thick' // maps to 0, 1, 2

type Radii = 'none' | 'subtle' | 'rounded' // maps to 0, 2, 4

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
    labelText?: string
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
    inputRadioBorder?: string
    inputRadioBorderChecked?: string
    /**
     * Info is used for loading bars or displaying information.
     */
    info?: string
    infoBackground?: string
    infoText?: string
    /**
     * Danger is used for error messages and destructive actions
     */
    danger?: string
    dangerBackground?: string
    dangerText?: string
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
  shadows?: {
    /**
     * Focus ring around interactive elements
     */
    focusRing?: string
  }
}

export type Message = { channel: string; data?: unknown } & (
  | {
      type: 'modeUpdated'
      data: {
        popup?: {
          message: string
          title: string
        }
        overlay?: {
          message
          title
          cancel
          link
        }
      }
    }
  | {
      type: 'approvalUrl'
      data: string
    }
  | {
      type: 'optionsLoaded'
      data: Array<{
        id?: string
        method: string
        mode: string
      }>
    }
  | {
      type: 'transactionCreated'
      data: {
        id: string
        status: string
        paymentMethod?: { id?: string }
      }
    }
  | {
      type: 'transactionFailed'
      data: {
        code: number
        message?: string
        status?: string
        type?: string
      }
    }
  | {
      type: 'transactionCancelled'
    }
  | {
      type: 'frameReady'
    }
  | {
      type: 'transactionFailed'
      data: any
    }
  | {
      type: 'resize'
      data: any
    }
  | {
      type: 'updateOptions'
      data: any
    }
  | {
      type: 'approvalCancelled'
    }
  | {
      type: 'submitForm'
    }
  | {
      type: 'appleAbortSession'
    }
  | {
      type: 'appleCompletePayment'
      data: boolean
    }
  | {
      type: 'appleCompleteMerchantValidation'
      data: any
    }
  | {
      type: 'appleStartSession'
      data: ApplePayJS.ApplePayPaymentRequest
    }
  | {
      type: 'paymentMethodSelected'
      data: {
        method: string
        mode?: string
      }
    }
  | {
      type: 'googlePaySessionStarted'
    }
  | {
      type: 'googlePaySessionCompleted'
    }
  | {
      type: 'scrollTo'
    }
  | {
      type: 'beforeTransactionPending'
    }
  | {
      type: 'formValidationFailed'
    }
)

export type EmbedInstance = {
  submit: () => void
}

export type CartItem = {
  name: string
  quantity: number
  unitAmount: number
  discountAmount?: number
  taxAmount?: number
  externalIdentifier?: string
  sku?: string
  productUrl?: string
  imageUrl?: string
  categories?: string[]
  productType?:
    | 'physical'
    | 'discount'
    | 'shipping_fee'
    | 'sales_tax'
    | 'digital'
    | 'gift_card'
    | 'store_credit'
    | 'surcharge'
}

export type StatementDescriptor = {
  name?: string
  description?: string
  city?: string
  phoneNumber?: string
  url?: string
}
