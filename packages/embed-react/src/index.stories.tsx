import {
  withKnobs,
  boolean,
  text,
  select,
  number,
} from '@storybook/addon-knobs'
import React from 'react'
import Gr4vyEmbed from './'

export default {
  title: `Embed React`,
  decorators: [withKnobs],
}

const responseOptions = {
  '': ``,
  '202 - Request accepted': `prefer: code=202, example=Request accepted`,
  '400 - Incorrect JSON': `prefer: code=400, example=Incorrect JSON`,
  '401 - Unauthorized request': `prefer: code=401, example=An unauthorized request`,
}

const currencyOptions = [`USD`, `GBP`, `EUR`]

const intentOptions = [`capture`, `approve`, `auhtorize`]

const environmentOptions = ['development', 'production', 'staging']

export const Default = () => (
  <Gr4vyEmbed
    amount={number(`Amount`, 1299, {}, `Public`)}
    intent={select(`Intent`, intentOptions, 'capture', `Public`) as any}
    currency={select(`Currency`, currencyOptions, `USD`, `Public`)}
    apiHost={text(`API host`, `127.0.0.1:3100`, `Public`)}
    iframeHost={text(`iFrame host`, `127.0.0.1:8080`, `Public`)}
    bearerToken={text(`JWT token`, `1234567`, `Public`)}
    showButton={boolean(`Enable submit button`, true, `Public`)}
    environment={
      select(`Environment`, environmentOptions, 'development', `Public`) as any
    }
    debug
    preferResponse={select(
      `Prefered server response`,
      responseOptions,
      ``,
      `Development`
    )}
  />
)
