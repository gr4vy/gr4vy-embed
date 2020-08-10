import Component from '../src/'
import Frame from '../src/components/Frame'

test(`should export a Component from the package`, () => {
  expect(Frame).toEqual(Component)
})
