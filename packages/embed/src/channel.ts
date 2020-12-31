// Create a random channel ID for this connection
export const generateChannelId = (): string =>
  window.crypto.getRandomValues(new Uint32Array(4)).join('').slice(0, 32)
