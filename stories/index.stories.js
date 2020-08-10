
import React from 'react'
import { withKnobs } from "@storybook/addon-knobs"

import Gr4vy from '../src'

export default {
  title: `Integrations/Gr4vy`,
  decorators: [withKnobs]
}

export const Default = () => (
  <Gr4vy hostname='127.0.0.1:8080' />
)