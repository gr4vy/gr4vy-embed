jest.mock('@gr4vy/embed', () => ({
  __esModule: true,
  setup: jest.fn(),
}))

import { setup } from '@gr4vy/embed'
import { mount } from 'enzyme'
import React from 'react'
import Gr4vyEmbed, { Gr4vyEmbedProps } from './Gr4vyEmbed'

const options: Gr4vyEmbedProps & { channel: string } = {
  form: '#form',
  intent: 'capture',
  iframeHost: `localhost:8080`,
  apiHost: `localhost:3100`,
  token: `123456`,
  channel: `mychannel`,
  amount: 200,
  currency: 'GBP',
  onEvent: jest.fn(),
  environment: 'sandbox',
  country: 'US',
}

test(`should default to be not loaded`, () => {
  mount(<Gr4vyEmbed {...options} />)
  expect(setup).toHaveBeenCalledWith({
    amount: 200,
    apiHost: 'localhost:3100',
    token: '123456',
    intent: 'capture',
    channel: 'mychannel',
    currency: 'GBP',
    form: '#form',
    element: expect.any(HTMLDivElement),
    iframeHost: 'localhost:8080',
    onEvent: expect.any(Function),
    environment: 'sandbox',
    country: 'US',
  })
})
