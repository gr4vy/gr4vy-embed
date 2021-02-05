import { pick } from './pick'

describe('pick', () => {
  test(`should pick the listed keys from an object`, () => {
    const options = {
      foo: 'bar',
      bar: 'foo',
    }
    expect(pick(options, ['foo'])).toEqual({ foo: 'bar' })
  })
})
