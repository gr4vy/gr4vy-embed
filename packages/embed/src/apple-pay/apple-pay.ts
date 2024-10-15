import { SubjectManager } from 'subjects'

declare global {
  interface Window {
    ApplePaySession?: ApplePaySession
  }
}

export const loadApplePaySdk = (version = 'latest') => {
  return new Promise<boolean>((resolve, reject) => {
    if (document.getElementById('apple-pay-sdk')) {
      return
    }

    const script = document.createElement('script')
    script.id = 'apple-pay-sdk'
    script.type = 'text/javascript'
    script.src = `https://applepay.cdn-apple.com/jsapi/1.${version}/apple-pay-sdk.js`
    script.crossOrigin = ''
    script.onload = () => {
      if (window.ApplePaySession) {
        resolve(true)
      } else {
        console.error('Apple Pay SDK failed to load.')
        reject(false)
      }
    }
    script.onerror = () => {
      console.error('Error loading Apple Pay SDK.')
      reject(false)
    }

    document.head.appendChild(script)
  })
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
    } catch (e) {
      subjectManager.appleSessionError$.next(e?.message)
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
