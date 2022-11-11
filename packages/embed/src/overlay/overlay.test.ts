import { createSubjectManager } from '../subjects'
import { createOverlayController } from './overlay'

jest.useFakeTimers()

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

    jest.runAllTimers()

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

    jest.runAllTimers()

    expect(overlay.className).toEqual('gr4vy__overlay gr4vy__overlay--visible')
  })

  test('it should close both overlay and popup when a beforeunload event is triggered', () => {
    let result = false
    const approvalCancelled = subject.approvalCancelled$.subscribe(
      () => (result = true)
    )

    const logSpy = jest.spyOn(console, 'log').mockImplementation()

    const overlay = document.createElement('div')
    overlay.className = 'gr4vy__overlay gr4vy__overlay--hidden'
    createOverlayController(overlay, subject)
    subject.approvalUrl$.next('https://approval.gr4vy.com')

    jest.runAllTimers()

    expect(overlay.className).toEqual('gr4vy__overlay gr4vy__overlay--visible')

    // assuming there's already a beforeunload listener attached that
    // doesn't stop immediate propagation, so not to conflict with
    // our own listener call.
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault()
      console.log('Are you leaving?')
      return (e.returnValue = true)
    })

    window.dispatchEvent(new Event('beforeunload'))

    jest.runAllTimers()

    expect(logSpy).toHaveBeenCalledWith('Are you leaving?')
    expect(overlay.className).toEqual('gr4vy__overlay gr4vy__overlay--hidden')
    approvalCancelled.unsubscribe()
    expect(result).toBe(true)
  })
})
