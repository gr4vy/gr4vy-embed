declare global {
  interface Window {
    msCrypto: Crypto
  }
}

export const generateChannelId = (): string => {
  const crypto = window.crypto || window.msCrypto
  return crypto.getRandomValues(new Uint32Array(4)).join('').slice(0, 32)
}
