import { resolveTopLevelUrl } from './resolve-top-level-url'

const OWN_ORIGIN = 'https://checkout.merchant.test'

let documentSpy
let windowSpy

const mockFrame = ({
  ancestorOrigins,
  referrer = '',
  framed = true,
}: {
  ancestorOrigins?: string[]
  referrer?: string
  framed?: boolean
}) => {
  const self = {}

  documentSpy = jest.spyOn(global, 'document', 'get')
  documentSpy.mockImplementation(() => ({
    location: { protocol: 'https:', host: 'checkout.merchant.test' },
    referrer,
  }))

  windowSpy = jest.spyOn(global, 'window', 'get')
  windowSpy.mockImplementation(() => ({
    self,
    // A framed document has a `top` that isn't itself.
    top: framed ? {} : self,
    location: { ancestorOrigins },
  }))
}

afterEach(() => {
  documentSpy?.mockRestore()
  windowSpy?.mockRestore()
})

test('returns its own origin when not framed', () => {
  mockFrame({ framed: false })
  expect(resolveTopLevelUrl()).toEqual(OWN_ORIGIN)
})

test('returns the outermost ancestor origin when framed', () => {
  mockFrame({
    ancestorOrigins: [OWN_ORIGIN, 'https://shop.merchant.test'],
  })
  expect(resolveTopLevelUrl()).toEqual('https://shop.merchant.test')
})

test('ignores an unusable ancestor origin', () => {
  // Sandboxed frames report a literal "null" origin.
  mockFrame({
    ancestorOrigins: ['null'],
    referrer: 'https://shop.merchant.test/cart',
  })
  expect(resolveTopLevelUrl()).toEqual('https://shop.merchant.test')
})

test('falls back to the referrer when ancestorOrigins is unavailable', () => {
  mockFrame({ referrer: 'https://shop.merchant.test/cart' })
  expect(resolveTopLevelUrl()).toEqual('https://shop.merchant.test')
})

test('falls back to its own origin when the referrer is suppressed', () => {
  mockFrame({ referrer: '' })
  expect(resolveTopLevelUrl()).toEqual(OWN_ORIGIN)
})
