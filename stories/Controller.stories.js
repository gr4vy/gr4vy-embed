
import { withKnobs, boolean, text, select, optionsKnob, number } from "@storybook/addon-knobs"

import Frame from '../src'
import View, { defaultStyle } from '../src/components/Frame/View'

export default {
  title: `Integration`,
  decorators: [withKnobs]
}

const flowOptions = {
  'Store card only': [`store`],
  'Authorize only': [`authorize`],
  'Authorize and store': [`authorize`, `store`],
  'Authorize and capture': [`authorize`, `capture`],
  'Authorize, capture, and store': [`authorize`, `capture`, `store`]
}

const responseOptions = {
  '': ``,
  '202 - Request accepted': `prefer: code=202, example=Request accepted`,
  '400 - Incorrect JSON': `prefer: code=400, example=Incorrect JSON`,
  '401 - Unauthorized request': `prefer: code=401, example=An unauthorized request`
}

const debugOptions = {
  'Off': ``,
  'To Storybook': `log`,
  'To Console': `debug`
}

const currencyOptions = [`USD`, `GBP`, `EUR`]

export const Default = () => (
  <Frame
    flow={select(`Flow`, flowOptions, [`authorize`, `capture`, `store`], `Public`)}
    amount={number(`Amount`, 1299, {}, `Public`)}
    currency={select(`Currency`, currencyOptions, `USD`, `Public`)}
    apiHost={text(`API host`, `127.0.0.1:3100`, `Public`)}
    iframeHost={text(`iFrame host`, `127.0.0.1:8080`, `Public`)}
    bearerToken={text(`JWT token`, `1234567`, `Public`)}
    showButton={boolean(`Enable submit button`, true, `Public`)}
    debug={optionsKnob(`Enable debugging`, debugOptions, `log`, { display: `inline-radio` }, `Development`)}
    preferResponse={select(`Prefered server response`, responseOptions, ``, `Development`)}
    channel='mychannel'
  />
)

export const Loading = () => (
  <View
    url='http://localhost:8080'
    valid
    style={defaultStyle}
    loaded={false}
  />
)