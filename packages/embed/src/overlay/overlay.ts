import {
  approvalStarted$,
  approvalCompleted$,
  approvalCancelled$,
  approvalLost$,
  transactionFailed$,
} from '../subjects'

export type Overlay = {
  hide: () => void
  show: () => void
}

const overlayTitle = `Your payment has continued in a new secure window.`
const overlayPrompt = `Can not see the new window?`
const overlayLink = `Re-open window`

export const createOverlay = (element: HTMLDivElement): Overlay => {
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
  Link.addEventListener('click', () => approvalLost$.next())

  const CancelLink = document.createElement('div')
  CancelLink.className = 'gr4vy__overlay__link'
  CancelLink.textContent = `Cancel`
  CancelLink.addEventListener('click', () => approvalCancelled$.next())

  const Container = document.createElement('div')
  Container.className = 'gr4vy__overlay__container'
  Container.appendChild(Notice)
  Container.appendChild(Link)
  Container.appendChild(CancelLink)

  element.appendChild(Container)

  return {
    hide: () => {
      element.className = 'gr4vy__overlay gr4vy__overlay--hidden'
    },
    show: () => {
      element.className = 'gr4vy__overlay'
    },
  }
}

export const createOverlayController = (element: Overlay) => {
  require('./overlay.css')
  approvalStarted$.subscribe(element.show)
  approvalCompleted$.subscribe(element.hide)
  approvalCancelled$.subscribe(element.hide)
  transactionFailed$.subscribe(element.hide)
}
