export type RedirectPopup = {
  open: (onCloseCallback?: CallableFunction) => void
  close: () => void
  redirect: (url: string) => void
}

export const popupFeatures = (
  width: number,
  height: number,
  screenWidth: number,
  screenHeight: number
) => {
  const left = screenWidth / 2 - width / 2
  const top = screenHeight / 2 - height / 2
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
  onClose: CallableFunction
) => {
  const popup = open('', 'loading', features)
  popup.document.write(html)
  const stopCallback = waitForValue(() => popup.closed, true, onClose)
  return {
    popup,
    stopCallback,
  }
}

export const redirectPopup = (popup: WindowProxy, url: string) => {
  popup.location.href = url
}
