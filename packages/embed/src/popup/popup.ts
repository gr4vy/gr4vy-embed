import { SubjectManager } from '../subjects'
import { mutableRef } from '../utils'
import { redirectDocument } from './redirect-document'
import { openPopup, popupFeatures, redirectPopup } from './redirect-popup'

const DEFAULT_POPUP_WIDTH = 500
const DEFAULT_POPUP_HEIGHT = 589

export const createPopupController = (
  popup = mutableRef<{ popup: Window; stopCallback: () => void }>(),
  subject: SubjectManager,
  timeout?: number
) => {
  subject.approvalStarted$.subscribe(() => {
    const mode = subject.mode$.value()
    if (mode?.popup) {
      popup.current = openPopup(
        popupFeatures(
          mode.popup?.width || DEFAULT_POPUP_WIDTH,
          mode.popup?.height || DEFAULT_POPUP_HEIGHT
        ),
        redirectDocument(subject.mode$.value().popup),
        () => subject.approvalCancelled$.next(),
        timeout
      )
    }
  })

  subject.approvalUrl$.subscribe((url) => {
    if (popup.current) {
      redirectPopup(popup.current.popup, url)
    }
  })

  subject.approvalLost$.subscribe(() => {
    if (popup.current) {
      popup.current.popup.focus()
    }
  })

  subject.approvalCancelled$.subscribe(() => {
    popup.current?.popup.close()
  })

  subject.approvalCompleted$.subscribe(() => {
    popup.current?.popup.close()
  })

  subject.transactionFailed$.subscribe(() => {
    popup.current?.stopCallback()
    popup.current?.popup.close()
  })
}
