// Create a random channel ID for this connection
export const generateChannelId = (): string =>
  window.crypto.getRandomValues(new Uint32Array(3)).join('')
