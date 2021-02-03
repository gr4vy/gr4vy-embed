import {
  approvalUrl$,
  approvalCompleted$,
  approvalStarted$,
  approvalCancelled$,
} from '../subjects'
import { mutableRef, MutableRef } from '../utils'
import { redirectDocument } from './redirect-document'
import { openPopup, popupFeatures, redirectPopup } from './redirect-popup'

export const registerSubscriptions = (popup: MutableRef<Window>) => {
  approvalStarted$.subscribe(() => {
    popup.set(
      openPopup(
        popupFeatures(500, 589, screen.width, screen.height),
        redirectDocument,
        () => approvalCancelled$.next()
      )
    )
  })

  approvalUrl$.subscribe((url) => {
    if (popup.get()) {
      redirectPopup(popup.get(), url)
    }
  })

  approvalCompleted$.subscribe(() => {
    popup.get()?.close()
  })
}

const popup = mutableRef<Window>()

registerSubscriptions(popup)
