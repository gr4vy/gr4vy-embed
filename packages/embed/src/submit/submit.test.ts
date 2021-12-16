import { createSubjectManager, SubjectManager } from '../subjects'
import { createSubmitController } from './submit'

describe('createSubmitController', () => {
  let subject: SubjectManager

  beforeEach(() => {
    subject = createSubjectManager()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('on submit$', () => {
    it('should call formSubmit$', (done) => {
      createSubmitController(null, subject, null)
      subject.formSubmit$.subscribe(() => {
        done()
      })
      subject.submit$.next()

      jest.runAllTimers()
    })

    it('should call customSubmit if a custom option is selected', () => {
      subject.selectedOption$.next({
        mode: 'custom',
        method: 'test',
      })
      const onCustomSubmit = jest.fn()
      createSubmitController(null, subject, onCustomSubmit)
      subject.submit$.next()

      jest.runAllTimers()

      expect(onCustomSubmit).toHaveBeenLastCalledWith({ method: 'test' })
    })
  })

  describe('on transactionCreated$', () => {
    it('should call onComplete with a transaction id', () => {
      const onComplete = jest.fn()
      createSubmitController(onComplete, subject, null)
      subject.transactionCreated$.next({ id: '123', status: 'captured' })

      jest.runAllTimers()

      expect(onComplete).toHaveBeenCalledWith({ id: '123', status: 'captured' })
    })
  })
})
