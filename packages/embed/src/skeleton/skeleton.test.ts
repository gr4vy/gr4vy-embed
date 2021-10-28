import { createSubjectManager } from '../subjects'
import { createSkeletonController } from './skeleton'

describe('createSkeletonController', () => {
  it('should be removed when options have laoded', () => {
    const mockElement = {
      remove: jest.fn(),
    } as any
    const subject = createSubjectManager()
    createSkeletonController(mockElement, subject, undefined)
    subject.optionsLoaded$.next(true)
    expect(mockElement.remove).toHaveBeenCalled()
  })
})
