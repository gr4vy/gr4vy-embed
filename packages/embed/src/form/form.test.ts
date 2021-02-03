import { transactionCreated$, formSubmit$ } from '../subjects'
import { createFormController, FormNapperInstance } from './form'

describe('createFormController', () => {
  let formNapperMock: FormNapperInstance

  beforeEach(() => {
    formNapperMock = {
      hijack: jest.fn(),
      inject: jest.fn(),
      submit: jest.fn(),
    }
  })

  it('should hijack the form', () => {
    createFormController(formNapperMock)
    expect(formNapperMock.hijack).toHaveBeenCalled()
  })

  it('should call notify formSubmit$', (done) => {
    formSubmit$.subscribe(() => {
      done()
    })
    createFormController(formNapperMock)
    const callback = (formNapperMock.hijack as jest.Mock).mock.calls[0][0]
    callback()
  })

  describe('onTransactionCreated', () => {
    it('should inject the transaction id', () => {
      createFormController(formNapperMock)
      transactionCreated$.next('123')
      expect(formNapperMock.inject).toHaveBeenCalledWith(
        'gr4vy_transaction_id',
        '123'
      )
    })

    it('should submit the form', () => {
      createFormController(formNapperMock)
      transactionCreated$.next('123')
      expect(formNapperMock.submit).toHaveBeenCalled()
    })
  })
})
