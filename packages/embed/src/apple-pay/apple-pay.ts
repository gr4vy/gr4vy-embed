import { SubjectManager } from 'subjects'
import { error, log, warn } from 'utils'

const APPLE_PAY_TIMEOUT = 1000

declare global {
  interface Window {
    ApplePaySession?: ApplePaySession
  }
}

export const loadApplePaySdk = () => {
  return Promise.race([
    new Promise<boolean>((resolve) => {
      const delay = () => new Promise((res) => setTimeout(res, 2000))
      return delay().then(() => {
        if (
          window.ApplePaySession ||
          document.getElementById('apple-pay-sdk')
        ) {
          return resolve(true)
        }

        const script = document.createElement('script')
        script.id = 'apple-pay-sdk'
        script.type = 'text/javascript'
        script.src = `https://applepay.cdn-apple.com/jsapi/1.latest/apple-pay-sdk.js`
        script.crossOrigin = ''
        script.onload = () => {
          if (window.ApplePaySession) {
            log(
              'Apple Pay SDK loaded',
              { version: '1.latest' },
              { debug: true }
            )
            resolve(true)
          } else {
            error(
              'Error loading the Apple Pay JS SDK. window.ApplePaySession is not defined.',
              null,
              { debug: true }
            )
            resolve(false)
          }
        }
        script.onerror = (e) => {
          error('Error loading the Apple Pay JS SDK.', e, { debug: true })
          resolve(false)
        }

        document.head.appendChild(script)
      })
    }),
    new Promise((resolve) => {
      setTimeout(() => {
        if (!window.ApplePaySession) {
          warn(
            'Loading the Apple Pay JS SDK too too long. Consider adding the script directly to the page instead.',
            null,
            { debug: true }
          )
          return resolve(false)
        }
        resolve(true)
      }, APPLE_PAY_TIMEOUT)
    }),
  ])
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
