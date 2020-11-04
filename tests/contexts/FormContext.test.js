import { mount } from 'enzyme'

import { FormProvider } from '../../src/contexts/FormContext'

describe(`FormProvider`, () => {
  test(`should render its children`, () => {
    const container = document.createElement(`form`)
    const component = mount(<FormProvider container={container}>
      <h1>Example</h1>
    </FormProvider>)

    expect(component.text()).toEqual(`Example`)
  })
})