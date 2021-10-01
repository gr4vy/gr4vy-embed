import { SubjectManager } from '../subjects'

export const createApplePayController = (subjectManager: SubjectManager) => {
  let session: ApplePaySession

  subjectManager.startAppleSession$.subscribe((data) => {
    session = new ApplePaySession(3, data)
    session.begin()
    session.onvalidatemerchant = (event) => {
      subjectManager.appleValidateMerchant$.next(event.validationURL)
    }
    session.onpaymentauthorized = (event) => {
      subjectManager.applePayAuthorized$.next(event.payment.token)
    }
    subjectManager.appleCompletePayment$.subscribe((result) => {
      if (result) {
        session.completePayment(ApplePaySession.STATUS_SUCCESS)
      } else {
        session.completePayment(ApplePaySession.STATUS_FAILURE)
      }
    })
  })

  subjectManager.completeMerchantValidation$.subscribe((data) => {
    session.completeMerchantValidation(data)
  })
}
