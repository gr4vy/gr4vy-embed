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
  let retry = 0
  const interval = setInterval(() => {
    const valuesMatch = value === accessor()
    if (retry > 5 || valuesMatch) {
      clearInterval(interval)
    }
    if (valuesMatch) {
      callback()
    } else {
      retry = retry + 1
    }
  }, 10)
}

export const openPopup = (
  features: string,
  html: string,
  onClose: CallableFunction
) => {
  const popup = open('', 'loading', features)
  popup.document.write(html)
  popup.addEventListener('unload', () => {
    waitForValue(() => popup.closed, true, onClose)
  })
  return popup
}

export const redirectPopup = (popup: WindowProxy, url: string) => {
  popup.location.href = url
}
