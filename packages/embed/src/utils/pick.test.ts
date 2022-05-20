import { pick } from './pick'

describe('pick', () => {
  test(`should pick the listed keys from an object`, () => {
    const options = {
      foo: 'bar',
      bar: 'foo',
    }
    expect(pick(options, ['foo'])).toEqual({ foo: 'bar' })
  })

  test(`should not include keys with nullish values`, () => {
    const options = {
      foo: 'bar',
      bar: undefined,
      baz: null,
      bop: 0,
    }
    expect(pick(options, ['foo', 'bar', 'baz', 'bop'])).toEqual({
      foo: 'bar',
      bop: 0,
    })
  })
})
