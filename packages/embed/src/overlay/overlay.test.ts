import { approvalStarted$, approvalCompleted$ } from '../subjects'
import { createOverlayController } from './overlay'

describe('createOverlayController', () => {
  test('it should show the overlay when a popup is opened', () => {
    const overlay = document.createElement('div')
    createOverlayController(overlay)
    approvalStarted$.next()
    expect(overlay.className).toEqual('gr4vy__overlay')
  })

  test('it should hide the overlay when a popup is closed', () => {
    const overlay = document.createElement('div')
    createOverlayController(overlay)
    approvalCompleted$.next()
    expect(overlay.className).toEqual('gr4vy__overlay gr4vy__overlay--hidden')
  })
})
