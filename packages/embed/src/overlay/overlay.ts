import {
  approvalStarted$,
  approvalCompleted$,
  approvalCancelled$,
} from '../subjects'
import './overlay.css'

export type Overlay = {
  hide: () => void
  show: () => void
}

export const Overlay = (element: HTMLDivElement): Overlay => {
  element.className = `gr4vy__overlay gr4vy__overlay--hidden`

  return {
    hide: () => {
      element.className = 'gr4vy__overlay gr4vy__overlay--hidden'
    },
    show: () => {
      element.className = 'gr4vy__overlay'
    },
  }
}

export const createOverlayController = (element: HTMLDivElement) => {
  const _element = Overlay(element)
  approvalStarted$.subscribe(_element.show)
  approvalCompleted$.subscribe(_element.hide)
  approvalCancelled$.subscribe(_element.hide)
}
