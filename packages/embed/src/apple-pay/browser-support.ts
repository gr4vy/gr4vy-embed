declare global {
  interface Window {
    ApplePaySession?: ApplePaySession
  }
}

export const browserSupportsApplePay = () => {
  let isSupported = false
  try {
    isSupported =
      window.ApplePaySession &&
      ApplePaySession.canMakePayments() &&
      ApplePaySession.supportsVersion(3)
  } catch {
    // Apple Pay not supported and/or not a secure context
  }
  return isSupported
}

export const detectSupportedVersion = () => {
  if (ApplePaySession.supportsVersion(5)) {
    return 5
  }
  if (ApplePaySession.supportsVersion(4)) {
    return 4
  }
  if (ApplePaySession.supportsVersion(3)) {
    return 3
  }
  return null
}
