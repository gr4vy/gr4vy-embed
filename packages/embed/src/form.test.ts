import FormNapper from 'form-napper'
import { initFormNapper } from './form'

describe('initFormNapper()', () => {
  test('should return a formnapper object if a form is set', () => {
    const form = document.createElement('form')
    const fn = initFormNapper({ form })
    expect(fn).toBeInstanceOf(FormNapper)
  })

  test('should return undefined if no form was provided', () => {
    const fn = initFormNapper()
    expect(fn).toBeUndefined()
  })
})
