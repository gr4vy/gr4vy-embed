// initialize formnapper, binding it to the form element
import FormNapper from 'form-napper'
import { InternalConfig } from './types'

export const initFormNapper = (config: InternalConfig): FormNapper => {
  if (config.formContainer) {
    return new FormNapper(config.formContainer)
  }
}
