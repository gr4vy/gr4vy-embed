import { hostToUrl } from './host-to-url'

test('prepends http for local', () => {
  expect(hostToUrl('localhost:123')).toEqual('http://localhost:123')
})

test('prepends http for 127.0.0.1', () => {
  expect(hostToUrl('127.0.0.1:123')).toEqual('http://127.0.0.1:123')
})

test('prepends https', () => {
  expect(hostToUrl('host.test:123')).toEqual('https://host.test:123')
})
