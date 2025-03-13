import {
  createApplePayController,
  browserSupportsApplePay,
  detectSupportedVersion,
  loadApplePaySdk,
} from './apple-pay'
import { createConfig } from './create-config'
import { createFormController } from './form'
import { createFrameController } from './frame'
import { createOverlayController } from './overlay'
import { createPopupController } from './popup'
import { createSkeletonController } from './skeleton'
import { createSubjectManager } from './subjects'
import { createSubmitController } from './submit'
import { SetupConfig, Config, Message } from './types'
import {
  mutableRef,
  pick,
  log,
  warn,
  createMessageHandler,
  createDispatch,
  removeChildren,
  filterByType,
  setVersion,
} from './utils'
import { validate } from './validation'

export const optionKeys = [
  'amount',
  'currency',
  'intent',
  'apiHost',
  'gr4vyId',
  'token',
  'debug',
  'externalIdentifier',
  'buyerId',
  'buyerExternalIdentifier',
  'buyer',
  'environment',
  'store',
  'country',
  'theme',
  'locale',
  'display',
  'apiUrl',
  'customOptions',
  'metadata',
  'paymentSource',
  'cartItems',
  'statementDescriptor',
  'requireSecurityCode',
  'shippingDetailsId',
  'connectionOptions',
  'fullPageReturnUrl',
  'showDeleteButton',
  'merchantAccountId',
  'billingAddressFields',
  'antiFraudFingerprint',
  'enableAnimations',
  'separatePaymentOptions',
  'excludedMethods',
  'optionLabels',
  'autoSelectOption',
]

// Map of cleanup callbacks
const cleanup = new Map<string, () => void>()

// Stores of count of unique embed instances
let embedId = 0

// Stores timestamp of last submission
let lastSubmitted = 0

// Load Apple Pay SDK
const hasLoadedApplePaySdk = loadApplePaySdk()

/**
 * Setup function for the Embed integration.
 *
 * Requires a valid querySelector query representing an HTML element
 * to append the form to, and a list of valid options for the form.
 */
export function setup(setupConfig: SetupConfig) {
  // exit early if the config is not valid
  if (!validate(setupConfig)) {
    return
  }

  const config = createConfig(setupConfig)

  const subjectManager = createSubjectManager()

  const existingEmbedId = config.element.dataset.embedId

  // Cleanup existing element
  removeChildren(config.element)

  // Cleanup existing events
  if (cleanup.has(existingEmbedId)) {
    const cleanupFn = cleanup.get(existingEmbedId)
    cleanupFn()
  }

  // Attach a unique ID
  embedId = embedId + 1
  config.element.dataset.embedId = embedId.toString()

  // Loader
  const loader = document.createElement('div')
  createSkeletonController(loader, subjectManager, config.theme)

  // Overlay
  const overlay = document.createElement('div')
  createOverlayController(overlay, subjectManager)

  // Submit Transaction
  if (config.form) {
    createFormController(
      config.form as HTMLFormElement,
      config.onComplete,
      subjectManager,
      config.onCustomSubmit
    )
  } else {
    createSubmitController(
      config.onComplete,
      subjectManager,
      config.onCustomSubmit
    )
  }

  createPopupController(
    mutableRef<{ popup: Window; stopCallback: () => void }>(),
    subjectManager,
    config.redirectMode,
    config.popupTimeout
  )

  // Iframe - Load Gr4vy SPA/Attach to page
  const frame = document.createElement('iframe')
  createFrameController(frame, config.iframeSrc, subjectManager)

  // Attach elements to the DOM
  config.element.append(overlay, loader, frame)

  // If the iframe failed to load or it took too much time, log a warning.
  // This won't be displayed if the timer is cleared in frameReady.
  const frameLoadWarn = setTimeout(() => {
    warn(
      'Loading Embed UI failed or took too long. Please check that the `gr4vyId` and `environment` values are correct.',
      setupConfig,
      { debug: true }
    )
  }, 3000)

  const messageEvents: Partial<
    Record<Message['type'], (data: Message['data']) => void>
  > = {
    modeUpdated: subjectManager.mode$.next,
    approvalUrl: subjectManager.approvalUrl$.next,
    resize: (data) => subjectManager.frameHeight$.next(data?.frame?.height),
    optionsLoaded: subjectManager.optionsLoaded$.next,
    transactionCreated: subjectManager.transactionCreated$.next,
    transactionFailed: subjectManager.transactionFailed$.next,
    transactionCancelled: subjectManager.transactionCancelled$.next,
    appleStartSession: subjectManager.appleStartSession$.next,
    appleCompleteMerchantValidation:
      subjectManager.appleCompleteMerchantValidation$.next,
    appleCompletePayment: subjectManager.appleCompletePayment$.next,
    appleAbortSession: subjectManager.appleAbortSession$.next,
    googlePaySessionStarted: subjectManager.googlePaySessionStarted$.next,
    googlePaySessionCompleted: subjectManager.googlePaySessionCompleted$.next,
    frameReady: async ({ version } = {}) => {
      if (version) {
        setVersion('embed-ui', version)
      }
      clearTimeout(frameLoadWarn)

      // Apple Pay
      await hasLoadedApplePaySdk

      const supportedApplePayVersion = browserSupportsApplePay()
        ? detectSupportedVersion()
        : 0

      if (supportedApplePayVersion) {
        createApplePayController(subjectManager, supportedApplePayVersion)
      }

      return dispatch({
        type: 'updateOptions',
        data: {
          ...pick<Config>(config, optionKeys),
          supportedApplePayVersion,
          supportedGooglePayVersion: 1,
          hasBeforeTransaction:
            typeof config?.onBeforeTransaction === 'function',
        },
      })
    },
    paymentMethodSelected: subjectManager.selectedOption$.next,
    scrollTo: ({ top }: { top: number }) => {
      window.scrollTo({
        top: frame.offsetTop + top,
        left: 0,
        behavior: 'smooth',
      })
    },
    beforeTransactionPending: subjectManager.beforeTransactionPending$.next,
    formValidationFailed: subjectManager.formValidationFailed$.next,
  }

  const dispatch = createDispatch(
    config.iframeUrl,
    config.channel,
    frame.contentWindow,
    (message) => log(`Page emits`, message, { debug: config.debug })
  )

  const messageHandler = createMessageHandler<Message>(
    config.iframeUrl,
    config.channel,
    (message) => {
      log(`Page received`, message, { debug: config.debug })
      if (
        [
          'formUpdate',
          'transactionCreated',
          'transactionFailed',
          'apiError',
          'paymentMethodSelected',
          'transactionCancelled',
          'optionsLoaded',
        ].includes(message.type)
      ) {
        config.onEvent?.(message.type, message.data)
      }
      if (messageEvents[message.type]) {
        messageEvents[message.type](message.data)
      }
    }
  )

  const apiMessageHandler = createMessageHandler(
    config.apiUrl,
    config.channel,
    (message) => {
      frame.contentWindow.postMessage(message, config.iframeUrl)
    }
  )

  const approvalMessageHandler = createMessageHandler(
    config.iframeUrl,
    config.channel,
    filterByType(
      ['approvalErrored', 'transactionUpdated', 'approvalCancelled'],
      (message) => frame.contentWindow.postMessage(message, config.iframeUrl)
    )
  )

  subjectManager.formSubmit$.subscribe(() => {
    dispatch({ type: 'submitForm' })

    const now = Date.now()
    if (now - lastSubmitted < 250) {
      warn(
        "Embed has been submitted more than once in quick succession. If you're using `embed.submit()`, please ensure there's no `form` option set at the same time.",
        null,
        { debug: true }
      )
    }
    lastSubmitted = now
  })

  subjectManager.beforeTransactionPending$.subscribe(() => {
    if (config?.onBeforeTransaction) {
      return config
        .onBeforeTransaction(pick(config, ['metadata']))
        .then((transactionOptions = {}) => {
          dispatch({
            type: 'beforeTransactionDone',
            data: pick(transactionOptions, [
              'externalIdentifier',
              'shippingDetailsId',
              'metadata',
              'token',
            ]),
          })
        })
        .catch((error) => {
          dispatch({
            type: 'beforeTransactionError',
            data: { beforeTransactionError: error },
          })
        })
    }
  })

  subjectManager.approvalCancelled$.subscribe(() =>
    dispatch({ type: 'approvalCancelled' })
  )
  subjectManager.applePayAuthorized$.subscribe((token) =>
    dispatch({ type: 'applePayAuthorized', data: token })
  )
  subjectManager.appleValidateMerchant$.subscribe((validationUrl) =>
    dispatch({ type: 'appleValidateMerchant', data: validationUrl })
  )
  subjectManager.appleCancelSession$.subscribe(() =>
    dispatch({ type: 'appleCancelSession' })
  )
  subjectManager.appleSessionError$.subscribe((message) =>
    dispatch({ type: 'appleSessionError', data: message })
  )
  subjectManager.appleCompleteSession$.subscribe(() =>
    dispatch({ type: 'appleCompleteSession' })
  )

  window.addEventListener('message', messageHandler)
  window.addEventListener('message', apiMessageHandler)
  window.addEventListener('message', approvalMessageHandler)
  setVersion('embed')

  // Cleanup
  cleanup.set(embedId.toString(), () => {
    window.removeEventListener('message', messageHandler)
    window.removeEventListener('message', apiMessageHandler)
    window.removeEventListener('message', approvalMessageHandler)
  })

  return {
    submit: () => {
      subjectManager.formSubmit$.next()
    },
  }
}

export type DynamicOptions = Pick<
  SetupConfig,
  'externalIdentifier' | 'metadata' | 'token' | 'shippingDetailsId'
>

export type EmbedInstance = ReturnType<typeof setup>
