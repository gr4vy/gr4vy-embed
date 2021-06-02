import {
  approvalStarted$,
  approvalCompleted$,
  transactionFailed$,
} from '../subjects'
import { createOverlayController, createOverlay } from './overlay'

describe('createOverlayController', () => {
  test('it should show the overlay when a popup is opened', () => {
    const element = document.createElement('div')
    const overlay = createOverlay(element)
    overlay.hide()
    createOverlayController(overlay)
    approvalStarted$.next()
    expect(element.className).toEqual('gr4vy__overlay')
  })

  test('it should hide the overlay when a popup is closed', () => {
    const element = document.createElement('div')
    const overlay = createOverlay(element)
    overlay.show()
    createOverlayController(overlay)
    approvalCompleted$.next()
    expect(element.className).toEqual('gr4vy__overlay gr4vy__overlay--hidden')
  })

  test('it should hide the overlay when a transaction has failed', () => {
    const element = document.createElement('div')
    const overlay = createOverlay(element)
    overlay.show()
    createOverlayController(overlay)
    transactionFailed$.next()
    expect(element.className).toEqual('gr4vy__overlay gr4vy__overlay--hidden')
  })
})
