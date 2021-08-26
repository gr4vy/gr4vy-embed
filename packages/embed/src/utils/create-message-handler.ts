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

export const filterByType = (
  types: Array<string>,
  callback: (message: Message) => void
) => (message) => {
  if (types.includes(message.type)) {
    callback(message)
  }
}
