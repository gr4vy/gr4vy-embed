import { SubjectManager } from 'subjects'

declare global {
  interface Window {
    ApplePaySession?: ApplePaySession
  }
}

export const createApplePayController = (
  subjectManager: Pick<
    SubjectManager,
    | 'appleAbortSession$'
    | 'appleStartSession$'
    | 'appleValidateMerchant$'
    | 'applePayAuthorized$'
    | 'appleCompleteMerchantValidation$'
    | 'appleCompletePayment$'
    | 'appleSessionError$'
    | 'appleCancelSession$'
    | 'appleCompleteSession$'
  >,
  version: 3 | 4 | 5
) => {
  let session: ApplePaySession // only a single session at a time

  subjectManager.appleStartSession$.subscribe((data) => {
    try {
      session = new ApplePaySession(version, data)

      // handle merchant validation
      session.onvalidatemerchant = (event) => {
        subjectManager.appleValidateMerchant$.next(event.validationURL)
      }

      // handle payment authorization
      session.onpaymentauthorized = (event) => {
        subjectManager.applePayAuthorized$.next(event.payment.token)
      }

      // cancel the apple pay session
      session.oncancel = () => {
        subjectManager.appleCancelSession$.next()
      }

      // start the session
      session.begin()
    } catch {
      subjectManager.appleSessionError$.next()
    }
  })

  // handle payment completion
  subjectManager.appleCompleteMerchantValidation$.subscribe((data) => {
    session.completeMerchantValidation(data)
  })

  subjectManager.appleAbortSession$.subscribe(() => {
    session?.abort && session.abort()
  })

  // handle
  subjectManager.appleCompletePayment$.subscribe((result) => {
    if (result) {
      session.completePayment(ApplePaySession.STATUS_SUCCESS)
    } else {
      session.completePayment(ApplePaySession.STATUS_FAILURE)
    }
    subjectManager.appleCompleteSession$.next()
  })
}
