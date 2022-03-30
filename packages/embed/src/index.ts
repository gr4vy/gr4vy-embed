import {
  createApplePayController,
  browserSupportsApplePay,
  detectSupportedVersion,
} from './apple-pay'
import { createConfig } from './create-config'
import { createFormController } from './form'
import { createFrameController } from './frame'
import { createOverlayController } from './overlay'
import { createPopupController } from './popup'
import { createSkeletonController } from './skeleton'
import { createSubjectManager } from './subjects'
import { createSubmitController } from './submit'
import { SetupConfig, Config, Message, EmbedInstance } from './types'
import {
  mutableRef,
  pick,
  log,
  createMessageHandler,
  createDispatch,
  removeChildren,
  filterByType,
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
]

// Map of cleanup callbacks
const cleanup = new Map<string, () => void>()

// Stores of count of unique embed instances
let embedId = 0

/**
 * Setup function for the Embed integration.
 *
 * Requires a valid querySelector query representing an HTML element
 * to append the form to, and a list of valid options for the form.
 */
export function setup(setupConfig: SetupConfig): EmbedInstance {
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
    subjectManager
  )

  // Iframe - Load Gr4vy SPA/Attach to page
  const frame = document.createElement('iframe')
  createFrameController(frame, config.iframeSrc, subjectManager)

  // Apple Pay
  const supportedApplePayVersion = browserSupportsApplePay()
    ? detectSupportedVersion()
    : 0

  if (supportedApplePayVersion) {
    createApplePayController(subjectManager, supportedApplePayVersion)
  }

  // Attach elements to the DOM
  config.element.append(overlay, loader, frame)

  // If the iframe failed to load or it took too much time, log a warning.
  // This won't be displayed if the timer is cleared in frameReady.
  const frameLoadWarn = setTimeout(() => {
    console.warn(
      'Loading Embed UI failed or took too long. Please check that the `gr4vyId` and `environment` values are correct.'
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
    frameReady: () => {
      clearTimeout(frameLoadWarn)
      return dispatch({
        type: 'updateOptions',
        data: {
          ...pick<Config>(config, optionKeys),
          supportedApplePayVersion,
          supportedGooglePayVersion: 1,
        },
      })
    },
    paymentMethodSelected: subjectManager.selectedOption$.next,
  }

  const dispatch = createDispatch(
    config.iframeUrl,
    config.channel,
    frame.contentWindow,
    (message) => log(`Page emits`, message, config.debug)
  )

  const messageHandler = createMessageHandler<Message>(
    config.iframeUrl,
    config.channel,
    (message) => {
      log(`Page received`, message, config.debug)
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
    filterByType(['approvalErrored', 'transactionUpdated'], (message) =>
      frame.contentWindow.postMessage(message, config.iframeUrl)
    )
  )

  subjectManager.formSubmit$.subscribe(() => dispatch({ type: 'submitForm' }))
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
  subjectManager.appleSessionError$.subscribe(() =>
    dispatch({ type: 'appleSessionError' })
  )
  subjectManager.appleCompleteSession$.subscribe(() =>
    dispatch({ type: 'appleCompleteSession' })
  )

  window.addEventListener('message', messageHandler)
  window.addEventListener('message', apiMessageHandler)
  window.addEventListener('message', approvalMessageHandler)

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
