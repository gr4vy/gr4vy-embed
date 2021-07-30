import { createMessageHandler } from './create-message-handler'

test('it should call the callback if channel/origin match', () => {
  const callback = jest.fn()
  const message = { channel: '123', type: 'testMessage', data: { foo: 'bar' } }
  const handler = createMessageHandler('my-origin', '123', callback)
  handler({
    origin: 'my-origin',
    data: message,
  } as MessageEvent)
  expect(callback).toHaveBeenCalledWith(message)
  callback.mockClear()
  handler({
    origin: 'not-my-origin',
    data: message,
  } as MessageEvent)
  expect(callback).not.toHaveBeenCalled()
})
