import { createDispatch } from './create-dispatch'

test('it should call the callback', () => {
  const windowMock = {
    postMessage: jest.fn(),
  }
  const callback = jest.fn()
  const message = { type: 'testMessage', data: { foo: 'bar' } }
  const dispatch = createDispatch(
    'my-origin',
    '123',
    (windowMock as unknown) as Window,
    callback
  )
  dispatch(message)
  expect(callback).toHaveBeenCalledWith(message)
})
