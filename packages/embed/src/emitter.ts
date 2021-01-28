import FormNapper from 'form-napper'
import Framebus from 'framebus'
import { log } from './logger'
import { InternalConfig } from './types'

const loadingBarCss = `
@keyframes gr4vy-sweep {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 600px 0;
  }
}
.gr4vy-loading-bar {
  height: 8px;
  background-image: linear-gradient( 
90deg
, #009CDE 25%, #BEE7FA 25%, #BEE7FA 75%, #009CDE 75% );
  background-size: 600px 8px;
  -webkit-animation: gr4vy-sweep 2s infinite cubic-bezier(0.2,0.75,0.77,0.25);
  animation: gr4vy-sweep 2s infinite cubic-bezier(0.2,0.75,0.77,0.25);
}
`

const redirectDocument = `
<html>
  <head>
    <title>Redirecting...</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
    <style>
      html, body {
        margin: 0;
        padding: 0;
        font-family: 'Lato', sans-serif;
        text-align: center;
      }
      .status {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      ${loadingBarCss}
    </style>
  </head>
  <div class="gr4vy-loading-bar"></div>
  <div class="status">
    <p>Redirecting to payment provider...</p>
  </div>
</html>
`

function createLoader() {
  const style = document.createElement('style')
  style.innerText = `
  ${loadingBarCss}
  .gr4vy-skeleton {
    display: flex;
    padding: 16px;
    border-bottom: 1px solid #BDC6D9;
  }
  .gr4vy-skeleton:last-child {
    border-bottom: none;
  }
  .gr4vy-skeleton-radio {
    border-radius: 50%;
    height: 16px;
    width: 16px;
    background-color: #DADBDC;
  }
  .gr4vy-skeleton-block {
    width: 50%;
    height: 16px;
    background-color: #DADBDC;
    margin-left: 16px;
    
  }
  .gr4vy-container {
    border: 1px solid #BDC6D9;
    max-width: 480px;
  }
  `
  const container = document.createElement('div')
  const skeleton = document.createElement('div')
  skeleton.innerHTML = `
  <div class="gr4vy-container">
    <div class="gr4vy-loading-bar"></div>
    <div class="gr4vy-skeleton">
      <div class="gr4vy-skeleton-radio"></div>
      <div class="gr4vy-skeleton-block"></div>
    </div>
    <div class="gr4vy-skeleton">
      <div class="gr4vy-skeleton-radio"></div>
    </div>
  </div>
  `
  container.appendChild(style)
  container.appendChild(skeleton)
  return container
}

/**
 * Initializes the framebus connection to the nested frame.
 *
 * @param config a configuration object
 * @param frame the iframe in which the nested UI is shown
 * @param form an optional FormNapper object that has been initialized with a form
 */
export const initFramebus = ({
  frame,
  config,
  formNapper,
}: {
  frame: HTMLElement
  config: InternalConfig
  formNapper?: FormNapper
}): void => {
  // initialize framebus and create curried functions for
  // listening and emitting events over framebus
  const { debug, onEvent } = config
  const framebus = createFramebus(config)
  const on = loggedFramebusOn(framebus, debug)
  const emit = loggedFramebusEmit(framebus, debug)
  const subscribe = loggedFramebusSubscribe(framebus, debug, onEvent)
  const loader = createLoader()
  config.element.appendChild(loader)

  /**
   * Popup
   */
  let needsPopup = false
  let popup: WindowProxy = null

  on('needsPopup', (value) => {
    needsPopup = value
  })

  on('popupUrl', (url) => {
    if (needsPopup) {
      popup.location.href = url
    }
  })

  /**
   * Basic overlay
   */
  const overlay = document.createElement('div')
  overlay.style.position = 'fixed'
  overlay.style.top = '0'
  overlay.style.left = '0'
  overlay.style.right = '0'
  overlay.style.zIndex = '100'
  overlay.style.background = 'rgba(0,0,0,0)'
  overlay.style.transition = 'all 0.5s linear'
  ;(overlay.style as any).backdropFilter = 'blur(2px)'
  document.body.append(overlay)
  function hideOverlay() {
    overlay.style.bottom = 'unset'
    overlay.style.background = 'rgba(0,0,0,0)'
  }
  function showOverlay() {
    overlay.style.bottom = '0'
    overlay.style.background = 'rgba(0,0,0,0.7)'
  }
  overlay.addEventListener('click', hideOverlay)

  // listen to internal events needed to communicate with the nested frame
  on('frameReady', () => emit('updateOptions', options(config)))
  on('resize', (data) => (frame.style.height = `${data.frame.height}px`))
  on('optionsLoaded', () => {
    frame.style.visibility = 'unset'
    frame.style.display = 'unset'
    loader.style.display = 'none'
  })

  // listen to the form to submit the form in the nested iframe
  // and listen to an event when the transaction was created
  // to insert a new gr4vy_transaction_id into the form
  formNapper?.hijack?.(() => {
    if (needsPopup) {
      showOverlay()
      const width = 500
      const height = 589
      const left = screen.width / 2 - width / 2
      const top = screen.height / 2 - height / 2
      popup = open(
        '',
        `Loading`,
        `width=${width},height=${height},top=${top},left=${left}`
      )
      popup.document.write(redirectDocument)
    }
    emit('submitForm')
  })
  on('transactionCreated', (data) => {
    popup?.close()
    popup = null
    formNapper?.inject?.(`gr4vy_transaction_id`, data.id)
    formNapper?.submit?.()
  })

  // subscribe to events that are exposed to the onEvent handler passed in by
  // the developer
  subscribe('formUpdate')
  subscribe('transactionCreated')
  subscribe('apiError')
}

/**
 * Initializes a new framebus connection
 *
 * @param config a configuration object
 */
export const createFramebus = (config: InternalConfig) => {
  // determine the origin of the iframe
  const { iframeUrl, channel } = config
  const origin = `${iframeUrl.protocol}//${iframeUrl.host}`
  // create a new framebus
  return Framebus.target({
    channel,
    origin,
  })
}

/**
 * Wraps the framebus.on function with a logger that automatically logs any
 * incoming events when the debug level is set.
 *
 * @param framebus The framebus to wrap in a logger
 * @param debug The debug level
 */
export const loggedFramebusOn = (framebus: Framebus, debug: boolean) => (
  eventName: string,
  callback: (data: any) => void
) => {
  framebus.on(eventName, (data: any) => {
    log(`Page received`, { type: eventName, payload: data }, debug)
    callback(data)
  })
}

/**
 * Wraps the framebus.emit function with a logger that automatically logs any
 * outgoing events when the debug level is set.
 *
 * @param framebus The framebus to wrap in a logger
 * @param debug The debug level
 */
export const loggedFramebusEmit = (framebus: Framebus, debug: boolean) => (
  eventName: string,
  data?: any
) => {
  log(`Page emits`, { type: eventName, payload: data }, debug)
  framebus.emit(eventName, data)
}

/**
 * Wraps the framebus.on function with a logger that automatically logs any
 * outgoing events when the debug level is set, and then automatically emits the
 * same event to the onEvent handler.
 *
 * @param framebus The framebus to wrap in a logger
 * @param debug The debug level
 */
export const loggedFramebusSubscribe = (
  framebus: Framebus,
  debug: boolean,
  onEvent?: (name: string, event: any) => void
) => (eventName) => {
  const on = loggedFramebusOn(framebus, debug)
  on(eventName, (data) => onEvent?.(eventName, data))
}

/**
 * Converts an InternalConfig object to only the options that can be sent
 * to the embedded iframe.
 *
 * @param config The user provided configuration plus the various HTML elements
 */
export const options = (config: InternalConfig): object => {
  const keys = [
    'amount',
    'channel',
    'currency',
    'capture',
    'apiHost',
    'bearerToken',
    'showButton',
    'debug',
    'externalIdentifier',
    'preferResponse',
    'buyerId',
    'buyerExternalIdentifier',
  ]

  return keys.reduce((object, key) => {
    object[key] = config[key]
    return object
  }, {})
}
