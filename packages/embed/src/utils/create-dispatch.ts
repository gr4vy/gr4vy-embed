type Message = { channel: string; type: string; data?: unknown }

export const createDispatch = (
  origin,
  channel,
  target: Window,
  callback: (message: Omit<Message, 'channel'>) => void
) => (message: Omit<Message, 'channel'>) => {
  target.postMessage({ channel, ...message }, origin)
  if (callback) callback(message)
}
