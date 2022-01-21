import { SubjectManager } from '../subjects'
import { mutableRef } from '../utils'
import { redirectDocument } from './redirect-document'
import { openPopup, popupFeatures, redirectPopup } from './redirect-popup'

export const createPopupController = (
  popup = mutableRef<{ popup: Window; stopCallback: () => void }>(),
  subject: SubjectManager
) => {
  subject.approvalStarted$.subscribe(() => {
    if (subject.mode$.value()?.popup) {
      popup.current = openPopup(
        popupFeatures(500, 589),
        redirectDocument(subject.mode$.value().popup),
        () => subject.approvalCancelled$.next()
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
      popup.current.stopCallback()
      popup.current.popup.close()
      subject.approvalStarted$.next()

      // Check if the approval url already exists
      const previousApprovalUrl = subject.approvalUrl$.value()
      if (previousApprovalUrl) {
        subject.approvalUrl$.next(previousApprovalUrl)
      }
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
