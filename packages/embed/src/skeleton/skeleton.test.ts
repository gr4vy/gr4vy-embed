import { optionsLoaded$ } from '../subjects'
import { createSkeletonController } from './skeleton'

jest.mock('../utils/create-subject')

describe('createSkeletonController', () => {
  it('should be removed when options have laoded', () => {
    const mockElement = {
      remove: jest.fn(),
    } as any
    createSkeletonController(mockElement)
    optionsLoaded$.next(true)
    expect(mockElement.remove).toHaveBeenCalled()
  })
})
