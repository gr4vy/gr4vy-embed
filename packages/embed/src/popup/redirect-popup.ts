export type RedirectPopup = {
  open: (onCloseCallback?: CallableFunction) => void
  close: () => void
  redirect: (url: string) => void
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
  const stopCallback = waitForValue(() => popup.closed, true, onClose)

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
