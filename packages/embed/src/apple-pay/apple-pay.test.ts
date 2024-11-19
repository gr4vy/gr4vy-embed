import { createSubjectManager } from 'subjects'
import {
  APPLE_PAY_TIMEOUT,
  createApplePayController,
  loadApplePaySdk,
} from './apple-pay'

jest.useFakeTimers()

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

  jest.runAllTimers()

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

  jest.runAllTimers()

  // act
  mockSubjectManager.appleStartSession$.next({ foo: 'bar' } as any)

  jest.runAllTimers()
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

  jest.runAllTimers()

  // act
  mockAppleSession.onvalidatemerchant({ validationURL: 'test-url' })
  jest.runAllTimers()
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

  jest.runAllTimers()

  // act
  mockAppleSession.onpaymentauthorized({ payment: { token: 'token-123' } })
  jest.runAllTimers()
})

test('should register an oncancel callback', (done) => {
  createApplePayController(mockSubjectManager, 3)
  mockSubjectManager.appleStartSession$.next({ foo: 'bar' } as any)

  // assert
  const subscription = mockSubjectManager.appleCancelSession$.subscribe(() => {
    subscription.unsubscribe()
    done()
  })

  jest.runAllTimers()

  // act
  mockAppleSession.oncancel()

  jest.runAllTimers()
})

test('should complete merchant validation', () => {
  createApplePayController(mockSubjectManager, 3)
  mockSubjectManager.appleStartSession$.next({ foo: 'bar' } as any)

  mockSubjectManager.appleCompleteMerchantValidation$.next('test-data')

  jest.runAllTimers()

  expect(mockAppleSession.completeMerchantValidation).toHaveBeenCalledWith(
    'test-data'
  )
})

test('should complete a successful payment', () => {
  createApplePayController(mockSubjectManager, 3)
  mockSubjectManager.appleStartSession$.next({ foo: 'bar' } as any)

  mockSubjectManager.appleCompletePayment$.next(true)

  jest.runAllTimers()

  expect(mockAppleSession.completePayment).toHaveBeenCalledWith(1)
})

test('should complete a failed payment', () => {
  createApplePayController(mockSubjectManager, 3)
  mockSubjectManager.appleStartSession$.next({ foo: 'bar' } as any)

  mockSubjectManager.appleCompletePayment$.next(false)

  jest.runAllTimers()
  expect(mockAppleSession.completePayment).toHaveBeenCalledWith(0)
})

test('should abort an applepay session', () => {
  createApplePayController(mockSubjectManager, 3)
  mockSubjectManager.appleStartSession$.next({ foo: 'bar' } as any)

  mockSubjectManager.appleAbortSession$.next()

  jest.runAllTimers()

  expect(mockAppleSession.abort).toHaveBeenCalledWith()
})

describe('loadApplePaySdk', () => {
  const globalDocument = global.document
  let createElementSpy: jest.SpyInstance
  let appendChildSpy: jest.SpyInstance
  let windowSpy: jest.SpyInstance
  let mockScript: HTMLScriptElement

  beforeEach(() => {
    appendChildSpy = jest.spyOn(document.head, 'appendChild')
    windowSpy = jest.spyOn(global, 'document', 'get')

    mockScript = globalDocument.createElement('script')
    createElementSpy = jest
      .spyOn(document, 'createElement')
      .mockImplementation(() => mockScript)
    window.ApplePaySession = undefined
  })

  afterEach(() => {
    appendChildSpy.mockRestore()
    windowSpy.mockRestore()
  })

  it('skips adding the script if ApplePaySession already exists', async () => {
    window.ApplePaySession = ({
      begin: jest.fn(),
    } as unknown) as ApplePaySession

    const result = await loadApplePaySdk()
    expect(result).toBe(true)
    expect(document.head.appendChild).not.toHaveBeenCalled()
  })

  it('loads the script successfully', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation()
    appendChildSpy.mockImplementation((script) => {
      window.ApplePaySession = ({
        begin: jest.fn(),
      } as unknown) as ApplePaySession
      script?.onload()
      return script
    })

    const result = await loadApplePaySdk()
    expect(result).toBe(true)
    expect(document.head.appendChild).toHaveBeenCalledWith(mockScript)
    expect(logSpy).toHaveBeenCalledWith('Gr4vy - Apple Pay JS SDK loaded', {
      version: '1.latest',
    })
  })

  it('fails to load the script', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation()
    appendChildSpy.mockImplementation((script) => {
      script?.onerror('Load error')
      return script
    })

    const result = await loadApplePaySdk()
    expect(result).toBe(false)
    expect(errorSpy).toHaveBeenCalledWith(
      'Gr4vy - Error loading the Apple Pay JS SDK.',
      'Load error'
    )
  })

  it('handles the loading timeout', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation()
    const loadPromise = loadApplePaySdk()

    jest.advanceTimersByTime(APPLE_PAY_TIMEOUT)

    const result = await loadPromise
    expect(result).toBe(false)
    expect(warnSpy).toHaveBeenCalledWith(
      'Gr4vy - Loading the Apple Pay JS SDK too too long. Consider adding the script directly to the page instead.',
      null
    )
  })

  it('sets the correct script attributes', async () => {
    appendChildSpy.mockImplementation((script) => {
      window.ApplePaySession = ({
        begin: jest.fn(),
      } as unknown) as ApplePaySession
      script?.onload()
      return script
    })

    await loadApplePaySdk()

    const createdScript = createElementSpy.mock.results[0].value
    expect(createdScript.id).toBe('apple-pay-sdk')
    expect(createdScript.type).toBe('text/javascript')
    expect(createdScript.src).toBe(
      'https://applepay.cdn-apple.com/jsapi/1.latest/apple-pay-sdk.js'
    )
    expect(createdScript.crossOrigin).toBe('')
  })
})
