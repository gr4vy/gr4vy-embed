import { SubjectManager } from '../subjects'

export const createFrameController = (
  frame: HTMLIFrameElement,
  url: string,
  subject: SubjectManager
) => {
  // default style
  frame.src = url
  frame.title = 'Secure payment frame - Gr4vy'
  frame.style.visibility = 'hidden'
  frame.style.display = 'none'
  frame.style.width = '100%'
  frame.style.height = '0px'
  frame.style.border = '0'
  frame.style.overflow = 'hidden'

  // deprecated fields
  frame.setAttribute('frameBorder', '0')
  frame.setAttribute('scrolling', 'no')

  subject.frameHeight$.subscribe((height) => {
    if (frame.style.visibility === 'unset') {
      frame.style.height = `${height}px`
    }
  })

  subject.optionsLoaded$.subscribe(() => {
    frame.style.visibility = 'unset'
    frame.style.display = 'unset'
  })
}
