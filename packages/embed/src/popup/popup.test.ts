import {
  approvalUrl$,
  approvalCompleted$,
  approvalStarted$,
  approvalCancelled$,
  approvalLost$,
  transactionFailed$,
} from '../subjects'
import { mutableRef } from '../utils'
import { registerSubscriptions } from './popup'
import { openPopup, redirectPopup } from './redirect-popup'

jest.mock('../utils/create-subject')
jest.mock('./redirect-popup')
jest.useFakeTimers()

describe('registerSubscriptions', () => {
  const popup = mutableRef<{ popup: Window; stopCallback: () => void }>()

  beforeEach(() => {
    // reset mocks
    ;(openPopup as jest.Mock).mockReset()

    // reset subjects
    const subjects = [
      approvalStarted$,
      approvalUrl$,
      approvalCompleted$,
      approvalLost$,
    ]
    subjects.map((subject$: any) => subject$.reset())

    // setup
    popup.current = null
    registerSubscriptions(popup)
  })

  test('opens a popup when a transaction requires approval', () => {
    const mockPopup = jest.fn()
    ;(openPopup as jest.Mock).mockReturnValue(mockPopup)
    approvalStarted$.next()
    expect(openPopup).toHaveBeenCalled()
    expect(popup.current).toEqual(mockPopup)
  })

  test('redirects popup when an approval url is available', () => {
    const mockPopup = {
      popup: jest.fn(),
      stopCallback: jest.fn(),
    } as any
    popup.current = mockPopup
    approvalUrl$.next('test-url')
    expect(redirectPopup).toHaveBeenCalledWith(mockPopup.popup, 'test-url')
  })

  test('checks to redirect popup when an approval url is available', () => {
    popup.current = null
    approvalUrl$.next('test-url')
  })

  test('closes popup when approval is complete', () => {
    const mockPopup = {
      popup: {
        close: jest.fn(),
      },
      stopCallback: jest.fn(),
    } as any
    popup.current = mockPopup
    approvalCompleted$.next()
    expect(mockPopup.popup.close).toHaveBeenCalled()
  })

  test('checks to close popup when approval is complete', () => {
    popup.current = null
    approvalCompleted$.next()
  })

  test('closes popup when transaction has failed', () => {
    const mockPopup = {
      popup: {
        close: jest.fn(),
      },
      stopCallback: jest.fn(),
    } as any
    popup.current = mockPopup
    transactionFailed$.next()
    expect(mockPopup.stopCallback).toHaveBeenCalled()
    expect(mockPopup.popup.close).toHaveBeenCalled()
  })

  test('checks to close popup when transaction has failed', () => {
    popup.current = null
    transactionFailed$.next()
  })

  test('cancels approval when popup is closed', (done) => {
    const mockPopup = {
      popup: {
        close: jest.fn(),
      },
      stopCallback: jest.fn(),
    }
    ;(openPopup as jest.Mock).mockReturnValue(mockPopup)
    approvalStarted$.next()
    const closeCallback = (openPopup as jest.Mock).mock.calls[0][2]
    approvalCancelled$.subscribe(() => {
      done()
    })
    closeCallback()
  })

  test('checks to close popup when approval is cancelled', () => {
    popup.current = null
    approvalCancelled$.next()
  })

  test('restarts approval when lost', () => {
    // clear all subscribers to isolate
    ;(approvalUrl$ as any).reset()
    ;(approvalStarted$ as any).reset()

    approvalUrl$.next('test-url')
    const mockPopup = {
      popup: {
        close: jest.fn(),
      },
      stopCallback: jest.fn(),
    } as any
    popup.current = mockPopup
    let hasApprovalStarted = false
    let hasApprovalUrlBeenReplayed = false
    approvalStarted$.subscribe(() => (hasApprovalStarted = true))
    approvalUrl$.subscribe(() => (hasApprovalUrlBeenReplayed = true))
    approvalLost$.next()
    expect(mockPopup.stopCallback).toHaveBeenCalled()
    expect(mockPopup.popup.close).toHaveBeenCalled()
    expect(hasApprovalStarted).toBeTruthy()
    expect(hasApprovalUrlBeenReplayed).toBeTruthy()
  })

  test('restarts approval without an approval url', () => {
    // clear all subscribers to isolate
    ;(approvalUrl$ as any).reset()
    ;(approvalStarted$ as any).reset()
    approvalUrl$.next(null)
    const mockPopup = {
      popup: {
        close: jest.fn(),
      },
      stopCallback: jest.fn(),
    } as any
    popup.current = mockPopup
    let hasApprovalUrlBeenReplayed = false
    approvalUrl$.subscribe(() => (hasApprovalUrlBeenReplayed = true))
    approvalLost$.next()
    expect(hasApprovalUrlBeenReplayed).toBeFalsy()
  })
})
