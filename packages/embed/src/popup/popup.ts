import {
  approvalUrl$,
  approvalCompleted$,
  approvalStarted$,
  approvalCancelled$,
  transactionFailed$,
  approvalLost$,
} from '../subjects'
import { mutableRef } from '../utils'
import { redirectDocument } from './redirect-document'
import { openPopup, popupFeatures, redirectPopup } from './redirect-popup'

export const registerSubscriptions = (
  popup = mutableRef<{ popup: Window; stopCallback: () => void }>()
) => {
  approvalStarted$.subscribe(() => {
    popup.current = openPopup(popupFeatures(500, 589), redirectDocument, () =>
      approvalCancelled$.next()
    )
  })

  approvalUrl$.subscribe((url) => {
    if (popup.current) {
      redirectPopup(popup.current.popup, url)
    }
  })

  approvalLost$.subscribe(() => {
    popup.current.stopCallback()
    popup.current.popup.close()
    approvalStarted$.next()

    // Check if the approval url already exists
    const previousApprovalUrl = approvalUrl$.value()
    if (previousApprovalUrl) {
      approvalUrl$.next(previousApprovalUrl)
    }
  })

  approvalCancelled$.subscribe(() => {
    popup.current?.popup.close()
  })

  approvalCompleted$.subscribe(() => {
    popup.current?.popup.close()
  })

  transactionFailed$.subscribe(() => {
    popup.current?.stopCallback()
    popup.current?.popup.close()
  })
}
