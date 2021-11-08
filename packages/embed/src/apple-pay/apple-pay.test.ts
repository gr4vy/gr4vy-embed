import { createSubjectManager } from '../subjects'
import { createApplePayController } from './apple-pay'

let mockAppleSession, mockSubjectManager

beforeEach(() => {
  mockAppleSession = {
    onvalidatemerchant: jest.fn(),
    onpaymentauthorized: jest.fn(),
    begin: jest.fn(),
    completeMerchantValidation: jest.fn(),
    completePayment: jest.fn(),
    abort: jest.fn(),
    oncancel: jest.fn(),
  }
  window.ApplePaySession = (jest
    .fn()
    .mockReturnValue(mockAppleSession) as unknown) as ApplePaySession
  ;(window.ApplePaySession as any).STATUS_SUCCESS = 1
  ;(window.ApplePaySession as any).STATUS_FAILURE = 0
  mockSubjectManager = createSubjectManager()
})

test('should start a session with version 3 and session data', () => {
  createApplePayController(mockSubjectManager, 3)

  mockSubjectManager.appleStartSession$.next({ foo: 'bar' } as any)

  expect(
    (window.ApplePaySession as unknown) as jest.Mock
  ).toHaveBeenCalledWith(3, { foo: 'bar' })
  expect(mockAppleSession.begin).toHaveBeenCalled()
})

test('should emit an error if session fails to create', (done) => {
  window.ApplePaySession = (() => {
    throw new Error('Test error')
  }) as any
  createApplePayController(mockSubjectManager, 3)

  // assert
  const subscription = mockSubjectManager.appleSessionError$.subscribe(() => {
    subscription.unsubscribe()
    done()
  })

  // act
  mockSubjectManager.appleStartSession$.next({ foo: 'bar' } as any)
})

test('should register an onvalidatemerchant callback', (done) => {
  createApplePayController(mockSubjectManager, 3)
  mockSubjectManager.appleStartSession$.next({ foo: 'bar' } as any)

  // assert
  const subscription = mockSubjectManager.appleValidateMerchant$.subscribe(
    (validationUrl) => {
      subscription.unsubscribe()
      expect(validationUrl).toBe('test-url')
      done()
    }
  )

  // act
  mockAppleSession.onvalidatemerchant({ validationURL: 'test-url' })
})

test('should register an onpaymentauthorized callback', (done) => {
  createApplePayController(mockSubjectManager, 3)
  mockSubjectManager.appleStartSession$.next({ foo: 'bar' } as any)

  // assert
  const subscription = mockSubjectManager.applePayAuthorized$.subscribe(
    (token) => {
      subscription.unsubscribe()
      expect(token).toBe('token-123')
      done()
    }
  )

  // act
  mockAppleSession.onpaymentauthorized({ payment: { token: 'token-123' } })
})

test('should register an oncancel callback', (done) => {
  createApplePayController(mockSubjectManager, 3)
  mockSubjectManager.appleStartSession$.next({ foo: 'bar' } as any)

  // assert
  const subscription = mockSubjectManager.appleCancelSession$.subscribe(() => {
    subscription.unsubscribe()
    done()
  })

  // act
  mockAppleSession.oncancel()
})

test('should complete merchant validation', () => {
  createApplePayController(mockSubjectManager, 3)
  mockSubjectManager.appleStartSession$.next({ foo: 'bar' } as any)

  mockSubjectManager.appleCompleteMerchantValidation$.next('test-data')

  expect(mockAppleSession.completeMerchantValidation).toHaveBeenCalledWith(
    'test-data'
  )
})

test('should complete a successful payment', (done) => {
  createApplePayController(mockSubjectManager, 3)
  mockSubjectManager.appleStartSession$.next({ foo: 'bar' } as any)

  // assert
  mockSubjectManager.appleCompleteSession$.subscribe(() => {
    expect(mockAppleSession.completePayment).toHaveBeenCalledWith(1)
    done()
  })

  // act
  mockSubjectManager.appleCompletePayment$.next(true)
})

test('should complete a failed payment', (done) => {
  createApplePayController(mockSubjectManager, 3)
  mockSubjectManager.appleStartSession$.next({ foo: 'bar' } as any)

  // assert
  mockSubjectManager.appleCompleteSession$.subscribe(() => {
    expect(mockAppleSession.completePayment).toHaveBeenCalledWith(0)
    done()
  })

  // act
  mockSubjectManager.appleCompletePayment$.next(false)
})

test('should abort an applepay session', () => {
  createApplePayController(mockSubjectManager, 3)
  mockSubjectManager.appleStartSession$.next({ foo: 'bar' } as any)

  mockSubjectManager.appleAbortSession$.next()

  expect(mockAppleSession.abort).toHaveBeenCalledWith()
})
