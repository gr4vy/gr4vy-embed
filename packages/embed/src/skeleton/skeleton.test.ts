import { createSubjectManager } from 'subjects'
import { createSkeletonController } from './skeleton'

jest.useFakeTimers()

describe('createSkeletonController', () => {
  it('should be removed when options have laoded', () => {
    const mockElement = {
      remove: jest.fn(),
    } as any
    const subject = createSubjectManager()
    createSkeletonController(mockElement, subject, undefined)
    subject.optionsLoaded$.next([])

    jest.runAllTimers()

    expect(mockElement.remove).toHaveBeenCalled()
  })
})
