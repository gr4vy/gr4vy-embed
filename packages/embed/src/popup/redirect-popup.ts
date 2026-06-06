export type RedirectPopup = {
  open: (onCloseCallback?: CallableFunction) => void
  close: () => void
  redirect: (url: string) => void
}

const isCrossOriginError = (error: unknown): boolean => {
  if (!(error instanceof Error)) return false
  // SecurityError (Chrome, Firefox) or DOMException with code 18 (Safari)
  return (
    error.name === 'SecurityError' ||
    (error instanceof DOMException && error.code === 18) ||
    error.message.includes('cross-origin')
  )
}

export const popupFeatures = (
  width: number,
  height: number,
  _window: Window = window
) => {
  const left = _window.innerWidth / 2 - width / 2 + _window.screenLeft
  const top = _window.innerHeight / 2 - height / 2 + _window.screenTop
  return `width=${width},height=${height},top=${top},left=${left}`
}

export const waitForValue = (accessor, value, callback) => {
  const interval = setInterval(() => {
    if (value === accessor()) {
      clearInterval(interval)
      callback()
    }
  }, 10)
  return () => clearInterval(interval)
}

export const openPopup = (
  features: string,
  html: string,
  onClose: CallableFunction,
  timeout?: number
) => {
  const popup = open('', 'loading', features)
  popup.document.write(html)
  const stopCallback = waitForValue(
    () => {
      try {
        return popup.closed
      } catch (error) {
        // we might encounter a cross origin error if the popup has navigated to a
        // different domain, in which case we should ignore the error (so we don't pollute Sentry)
        // and keep polling in case the context is reinstated
        // Safari throws an error when accessing popup.closed if the popup has lost context
        // (navigated to different domain)
        // see https://gr4vy-tq.sentry.io/issues/7486375527/?alert_rule_id=15723108&alert_type=issue&notification_uuid=d68908db-b3c0-434c-b0db-640ed0ec7cdb&project=4508636754477056&referrer=slack
        // this logic is here so we don't pollute Sentry, we might as well just ignore the error
        // in the Sentry config, but then we would miss that SecurityError instances in legitimate cases
        if (!isCrossOriginError(error)) {
          throw error
        }
      }
    },
    true,
    onClose
  )

  if (timeout) {
    setTimeout(() => popup.close(), timeout)
  }

  return {
    popup,
    stopCallback,
  }
}

export const redirectPopup = (popup: WindowProxy, url: string) => {
  popup.location.href = url
}
