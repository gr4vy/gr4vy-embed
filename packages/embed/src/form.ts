// initialize formnapper, binding it to the form element
import FormNapper from 'form-napper'
import { InternalConfig } from './types'

export const initFormNapper = (config: InternalConfig): FormNapper => {
  if (config.form) {
    return new FormNapper(config.form)
  }
}
