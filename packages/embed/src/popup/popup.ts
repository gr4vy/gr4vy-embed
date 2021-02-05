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
    popup.current = openPopup(
      popupFeatures(500, 589, screen.width, screen.height),
      redirectDocument,
      () => approvalCancelled$.next()
    )
  })

  approvalUrl$.subscribe((url) => {
    if (popup.current) {
      redirectPopup(popup.current, url)
    }
  })

  approvalCompleted$.subscribe(() => {
    popup.current?.close()
  })
}

const popup = mutableRef<Window>()

registerSubscriptions(popup)
