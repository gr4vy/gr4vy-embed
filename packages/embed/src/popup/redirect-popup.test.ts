import {
  openPopup,
  popupFeatures,
  redirectPopup,
  waitForValue,
} from './redirect-popup'

jest.useFakeTimers()

describe('popupFeatures', () => {
  it('should configure a centered popup feature string', () => {
    const mockWindow: Partial<Window> = {
      innerHeight: 800,
      innerWidth: 1000,
      screenLeft: 20,
      screenTop: 40,
    }
    expect(popupFeatures(500, 589, mockWindow as Window)).toEqual(
      'width=500,height=589,top=145.5,left=270'
    )
  })
})

describe('waitForValue', () => {
  it('should call the callback when the value matches', () => {
    const onClose = jest.fn()
    waitForValue(() => true, true, onClose)
    jest.runOnlyPendingTimers()
    expect(onClose).toHaveBeenCalled()
  })

  it('should not call the callback if the value does not match', () => {
    const onClose = jest.fn()
    const stop = waitForValue(() => true, false, onClose)
    jest.runOnlyPendingTimers()
    stop()
    expect(onClose).not.toHaveBeenCalled()
  })
})

describe('openPopup', () => {
  it('should open a configured popup', () => {
    const mockPopup = {
      document: {
        write: jest.fn(),
      },
    }
    global.open = jest.fn().mockReturnValue(mockPopup)
    const onClose = jest.fn()
    const popup = openPopup({
      features: 'width=10,height=10',
      html: '<html>',
      onClose,
    })
    expect(global.open).toHaveBeenCalledTimes(1)
    expect(mockPopup.document.write).toHaveBeenCalledWith('<html>')
    expect(popup.popup).toBe(mockPopup)
    expect(popup.stopCallback).toBeDefined()
  })

  it('should register a callback on close', () => {
    const mockPopup = {
      document: {
        write: jest.fn(),
      },
      addEventListener: jest.fn(),
      closed: false,
    }
    global.open = jest.fn().mockReturnValue(mockPopup)
    const onClose = jest.fn()
    openPopup({
      features: 'width=10,height=10',
      html: '<html>',
      onClose,
    })
    jest.runOnlyPendingTimers()
    expect(onClose).not.toHaveBeenCalled()

    mockPopup.closed = true
    jest.runOnlyPendingTimers()
    expect(onClose).toHaveBeenCalled()
  })
})

describe('redirectPopup', () => {
  it('should set the popup href', () => {
    const mockPopup = {
      location: {
        href: 'foo',
      },
    }
    redirectPopup(mockPopup as Window, 'bar')
    expect(mockPopup.location.href).toBe('bar')
  })
})
