import { SubjectManager } from 'subjects'
import { Config } from 'types'
import { mutableRef } from 'utils'
import { redirectDocument } from './redirect-document'
import { openPopup, popupFeatures, redirectPopup } from './redirect-popup'

const DEFAULT_POPUP_WIDTH = 500
const DEFAULT_POPUP_HEIGHT = 589

export const createPopupController = (
  popup = mutableRef<{ popup: Window; stopCallback: () => void }>(),
  subject: SubjectManager,
  redirectMode: Config['redirectMode'],
  timeout?: number
) => {
  subject.approvalStarted$.subscribe(() => {
    const mode = subject.mode$.value()

    // clear any existing popup references
    if (popup.current) {
      popup.current?.stopCallback()
      popup.current?.popup?.close()
      popup.current = undefined
    }

    if (mode?.popup && redirectMode === 'fallback') {
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
    const mode = subject.mode$.value()

    // redirect behaviour should only be applied to popups
    if (mode?.popup) {
      if (popup.current) {
        redirectPopup(popup.current.popup, url)
      } else {
        // redirect the full page if popup failed
        subject.hideOverlay$.next()

        /*
         * .replace() ensures the user will not be able to return to the existing page.
         * The redirect also needs to occur after the overlay has been hidden,
         * this will then not be affected by the beforeunload event.
         */
        setTimeout(() => window.location.replace(url), 0)
      }
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

  subject.formValidationFailed$.subscribe(() => {
    popup.current?.popup.close()
  })
}
