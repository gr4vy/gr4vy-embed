import { SubjectManager } from '../subjects'

const overlayTitle = `Your payment has continued in a new secure window.`
const overlayPrompt = `Can not see the new window?`
const overlayLink = `Re-open window`

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
  Title.textContent = overlayTitle

  const Prompt = document.createElement('div')
  Prompt.textContent = overlayPrompt

  const Notice = document.createElement('div')
  Notice.className = 'gr4vy__overlay__notice '
  Notice.appendChild(Title)
  Notice.appendChild(Prompt)

  const Link = document.createElement('div')
  Link.className = 'gr4vy__overlay__link'
  Link.textContent = overlayLink
  Link.addEventListener('click', () => subject.approvalLost$.next())

  const CancelLink = document.createElement('div')
  CancelLink.className = 'gr4vy__overlay__link'
  CancelLink.textContent = `Cancel`
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
    element.className = 'gr4vy__overlay'
  }

  subject.approvalStarted$.subscribe(show)
  subject.approvalCompleted$.subscribe(hide)
  subject.approvalCancelled$.subscribe(hide)
  subject.transactionFailed$.subscribe(hide)
}
