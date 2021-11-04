import { SubjectManager } from '../subjects'

declare global {
  interface Window {
    ApplePaySession?: ApplePaySession
  }
}

export const createApplePayController = (
  subjectManager: Pick<
    SubjectManager,
    | 'appleAbortSession$'
    | 'startAppleSession$'
    | 'appleValidateMerchant$'
    | 'applePayAuthorized$'
    | 'completeMerchantValidation$'
    | 'appleCompletePayment$'
    | 'appleSessionError$'
  >
) => {
  let session: ApplePaySession // only a single session at a time

  subjectManager.startAppleSession$.subscribe((data) => {
    try {
      session = new ApplePaySession(3, data)

      // handle merchant validation
      session.onvalidatemerchant = (event) => {
        subjectManager.appleValidateMerchant$.next(event.validationURL)
      }

      // handle payment authorization
      session.onpaymentauthorized = (event) => {
        subjectManager.applePayAuthorized$.next(event.payment.token)
      }

      // start the session
      session.begin()
    } catch {
      subjectManager.appleSessionError$.next()
    }
  })

  // handle payment completion
  subjectManager.completeMerchantValidation$.subscribe((data) => {
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
  })
}
