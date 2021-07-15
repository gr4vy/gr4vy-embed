import { SubjectManager } from '../subjects'

let isFirstLoad = true

export const createOverlayController = (
  element: HTMLDivElement,
  subject: SubjectManager
) => {
  if (isFirstLoad) {
    require('./overlay.css')
    isFirstLoad = false
  }

  element.className = `gr4vy__overlay gr4vy__overlay--hidden`

  const Title = document.createElement('div')
  const Prompt = document.createElement('div')
  const Notice = document.createElement('div')
  Notice.className = 'gr4vy__overlay__notice '
  Notice.appendChild(Title)
  Notice.appendChild(Prompt)

  const Link = document.createElement('div')
  Link.className = 'gr4vy__overlay__link'
  Link.addEventListener('click', () => subject.approvalLost$.next())

  const CancelLink = document.createElement('div')
  CancelLink.className = 'gr4vy__overlay__link'
  CancelLink.addEventListener('click', () => subject.approvalCancelled$.next())

  const Container = document.createElement('div')
  Container.className = 'gr4vy__overlay__container'
  Container.appendChild(Notice)
  Container.appendChild(Link)
  Container.appendChild(CancelLink)

  element.appendChild(Container)

  const hide = () => {
    element.className = 'gr4vy__overlay gr4vy__overlay--hidden'
  }

  const show = () => {
    const { overlay } = subject.mode$.value()
    Title.textContent = overlay.title
    Link.textContent = overlay.link
    Prompt.textContent = overlay.message
    CancelLink.textContent = overlay.cancel
    element.className = 'gr4vy__overlay'
  }

  subject.approvalStarted$.subscribe(show)
  subject.approvalCompleted$.subscribe(hide)
  subject.approvalCancelled$.subscribe(hide)
  subject.transactionFailed$.subscribe(hide)
}
