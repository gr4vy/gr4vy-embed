import { appendUrlParams } from './append-url-params'

test('should return a new frame host', () => {
  const frameUrl = appendUrlParams('http://localhost:8000', {
    paramA: 'valueA',
    paramB: 'valueB',
  })
  expect(frameUrl).toEqual('http://localhost:8000/?paramA=valueA&paramB=valueB')
})

test('should not include a param if undefined', () => {
  const frameUrl = appendUrlParams('http://localhost:8000', {
    paramA: 'valueA',
    paramB: undefined,
  })
  expect(frameUrl).toEqual('http://localhost:8000/?paramA=valueA')
})

test('should encode a url param', () => {
  const frameUrl = appendUrlParams('http://localhost:8000', {
    url: 'http://test.url',
  })
  expect(frameUrl).toEqual('http://localhost:8000/?url=http%3A%2F%2Ftest.url')
})
