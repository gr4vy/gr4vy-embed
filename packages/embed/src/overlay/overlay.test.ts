import { createSubjectManager } from '../subjects'
import { createOverlayController } from './overlay'

describe('createOverlayController', () => {
  let subject

  beforeEach(() => {
    subject = createSubjectManager()
  })

  test('it should show the overlay when a popup is opened', () => {
    const overlay = document.createElement('div')
    overlay.className = 'gr4vy__overlay gr4vy__overlay--hidden'
    subject.mode$.next({
      popup: {
        title: 'Test',
      },
      overlay: {
        title: 'Test',
      },
    })
    createOverlayController(overlay, subject)
    subject.approvalStarted$.next()
    expect(overlay.className).toEqual('gr4vy__overlay gr4vy__overlay--visible')
  })

  test('it should hide the overlay when a popup is closed', () => {
    const overlay = document.createElement('div')
    overlay.className = 'gr4vy__overlay'
    createOverlayController(overlay, subject)
    subject.approvalCompleted$.next()
    expect(overlay.className).toEqual('gr4vy__overlay gr4vy__overlay--hidden')
  })

  test('it should hide the overlay when a transaction has failed', () => {
    const overlay = document.createElement('div')
    overlay.className = 'gr4vy__overlay'
    createOverlayController(overlay, subject)
    subject.transactionFailed$.next()
    expect(overlay.className).toEqual('gr4vy__overlay gr4vy__overlay--hidden')
  })

  test('it should show an iframe on approvalUrl when an overlay message is not defined', () => {
    const overlay = document.createElement('div')
    overlay.className = 'gr4vy__overlay gr4vy__overlay--hidden'
    createOverlayController(overlay, subject)
    subject.approvalUrl$.next('https://approval.gr4vy.com')
    expect(overlay.className).toEqual('gr4vy__overlay gr4vy__overlay--visible')
  })
})
