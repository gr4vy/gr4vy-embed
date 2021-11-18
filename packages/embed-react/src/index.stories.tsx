import { withKnobs, text, select, number } from '@storybook/addon-knobs'
import React, { useEffect, useRef, useState } from 'react'
import Gr4vyEmbed from './'

export default {
  title: `Embed React`,
  decorators: [withKnobs],
}

const currencyOptions = [`USD`, `GBP`, `EUR`]

const intentOptions = [`capture`, `approve`, `auhtorize`]

const environmentOptions = ['production', 'sandbox']

export const Default = () => {
  const form = useRef<HTMLFormElement>()
  const [formReady, setFormReady] = useState(false)

  useEffect(() => {
    setFormReady(true)
  }, [form.current])

  return (
    <>
      <form ref={form} />
      {formReady && (
        <Gr4vyEmbed
          form={form.current}
          amount={number(`Amount`, 1299, {}, `Public`)}
          intent={select(`Intent`, intentOptions, 'capture', `Public`) as any}
          currency={select(`Currency`, currencyOptions, `USD`, `Public`)}
          apiHost={text(`API host`, `127.0.0.1:3100`, `Public`)}
          iframeHost={text(`iFrame host`, `127.0.0.1:8082`, `Public`)}
          token={text(`JWT token`, `1234567`, `Public`)}
          country="US"
          environment={
            select(
              `Environment`,
              environmentOptions,
              'sandbox',
              `Public`
            ) as any
          }
          debug
        />
      )}
    </>
  )
}
