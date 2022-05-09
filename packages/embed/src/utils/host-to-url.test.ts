import { hostToUrl } from './host-to-url'

test('prepends http', () => {
  expect(hostToUrl('localhost:123', false)).toEqual('http://localhost:123')
  expect(hostToUrl('127.0.0.1:123', false)).toEqual('http://127.0.0.1:123')
})

test('prepends https', () => {
  expect(hostToUrl('host.test:123')).toEqual('https://host.test:123')
  expect(hostToUrl('host.test:123', true)).toEqual('https://host.test:123')
})
