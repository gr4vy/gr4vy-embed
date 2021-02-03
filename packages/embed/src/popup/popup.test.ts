import {
  approvalUrl$,
  approvalCompleted$,
  approvalStarted$,
  approvalCancelled$,
} from '../subjects'
import { mutableRef } from '../utils'
import { registerSubscriptions } from './popup'
import { openPopup, redirectPopup } from './redirect-popup'

jest.mock('../utils/create-subject')
jest.mock('./redirect-popup')

describe('registerSubscriptions', () => {
  let popup

  beforeEach(() => {
    // reset mocks
    ;(openPopup as jest.Mock).mockReset()

    // reset subjects
    const subjects = [
      approvalStarted$,
      approvalUrl$,
      approvalCompleted$,
      // approvalCancelled$,
    ]
    subjects.map((subject$: any) => subject$.reset())

    // setup
    popup = mutableRef<Window>()
    registerSubscriptions(popup)
  })

  test('opens a popup when a transaction requires approval', () => {
    const mockPopup = jest.fn()
    ;(openPopup as jest.Mock).mockReturnValue(mockPopup)
    approvalStarted$.next()
    expect(openPopup).toHaveBeenCalled()
    expect(popup.get()).toEqual(mockPopup)
  })

  it('redirects popup when an approval url is available', () => {
    const mockPopup = jest.fn() as any
    popup.set(mockPopup)
    approvalUrl$.next('test-url')
    expect(redirectPopup).toHaveBeenCalledWith(mockPopup, 'test-url')
  })

  test('checks to redirect popup when an approval url is available', () => {
    popup.set(null)
    approvalUrl$.next('test-url')
  })

  test('closes popup when approval is complete', () => {
    const mockPopup = {
      close: jest.fn(),
    }
    popup.set(mockPopup)
    approvalCompleted$.next()
    expect(mockPopup.close).toHaveBeenCalled()
  })

  test('checks to close popup when approval is complete', () => {
    popup.set(null)
    approvalCompleted$.next()
  })

  test('cancels approval when popup is closed', (done) => {
    const mockPopup = jest.fn()
    ;(openPopup as jest.Mock).mockReturnValue(mockPopup)
    approvalStarted$.next()
    const closeCallback = (openPopup as jest.Mock).mock.calls[0][2]
    approvalCancelled$.subscribe(() => {
      done()
    })
    closeCallback()
  })
})
