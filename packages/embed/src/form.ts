// initialize formnapper, binding it to the form element
import FormNapper from 'form-napper'

export const initFormNapper = ({
  form,
}: {
  form?: HTMLElement
} = {}): FormNapper => {
  if (form) {
    return new FormNapper(form)
  }
}
