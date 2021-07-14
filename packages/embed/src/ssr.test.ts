/**
 * @jest-environment node
 */

test('should render in SSR', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('./index')
})
