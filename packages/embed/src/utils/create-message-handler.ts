type Message = { channel: string; type: string; data?: unknown }

export const createMessageHandler = <T extends Message>(
  origin: string,
  channel: string,
  callback: (message: T) => void
) => (message: MessageEvent<T>) => {
  if (origin === message.origin && message.data.channel === channel) {
    callback(message.data)
  }
}
