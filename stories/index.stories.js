
import React from 'react'
import { withKnobs } from "@storybook/addon-knobs"

import Gr4vy from '../src'

export default {
  title: `Integrations/Gr4vy`,
  decorators: [withKnobs]
}

export const Default = () => (
  <Gr4vy 
    flow={[`authorize`, `capture`, `store`]}
    amount={ 1299 }
    currency='USD'
    iframeHost='localhost:8080' 
    apiHost='localhost:3100' 
    bearerToken='123456'
    showButton
    debug='log'
  />
)