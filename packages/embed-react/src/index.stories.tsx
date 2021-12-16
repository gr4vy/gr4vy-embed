import { withKnobs, text, select, number } from '@storybook/addon-knobs'
import React, { useEffect, useRef, useState } from 'react'
import Gr4vyEmbed, { EmbedInstance } from './'

export default {
  title: `Embed React`,
  decorators: [withKnobs],
}

const currencyOptions = [`USD`, `GBP`, `EUR`]

const intentOptions = [`capture`, `approve`]

const environmentOptions = ['production', 'sandbox']

const Template = ({ showRenderControls = false }) => {
  const form = useRef<HTMLFormElement>()
  const [formReady, setFormReady] = useState(false)
  const [amount, setAmount] = useState(number(`Amount`, 1299, {}, `Public`))
  const [count, setCount] = useState(1)
  const [color, setColor] = useState('green')

  useEffect(() => {
    setFormReady(true)
  }, [form.current])

  return (
    <>
      {showRenderControls && (
        <>
          <button onClick={() => setAmount(amount + 1)}>Increase amount</button>
          <button onClick={() => setCount(count + 1)}>Increase count</button>
          <button
            onClick={() =>
              setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
            }
          >
            Update theme color
          </button>
          <p>Amount: {amount} (Rerender)</p>
          <p>Count: {count}</p>
          <p>Color: {color} (Rerender)</p>
        </>
      )}
      <form ref={form} />
      {formReady && (
        <Gr4vyEmbed
          form={form.current}
          amount={amount}
          intent={select(`Intent`, intentOptions, 'capture', `Public`) as any}
          currency={select(`Currency`, currencyOptions, `USD`, `Public`)}
          apiHost={text(`API host`, `127.0.0.1:3100`, `Public`)}
          iframeHost={text(`iFrame host`, `127.0.0.1:8082`, `Public`)}
          token={text(`JWT token`, `1234567`, `Public`)}
          country="US"
          theme={{
            colors: {
              primary: color,
            },
          }}
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

export const Default = () => <Template />

export const RenderTest = () => <Template showRenderControls={true} />

RenderTest.parameters = {
  storyshots: { disable: true },
}

export const WithoutForm = () => {
  const embed = useRef<EmbedInstance>()
  return (
    <>
      <button onClick={() => embed.current.submit()}>Submit</button>
      <Gr4vyEmbed
        ref={embed}
        amount={number(`Amount`, 1299, {}, `Public`)}
        intent={select(`Intent`, intentOptions, 'capture', `Public`) as any}
        currency={select(`Currency`, currencyOptions, `USD`, `Public`)}
        apiHost={text(`API host`, `127.0.0.1:3100`, `Public`)}
        iframeHost={text(`iFrame host`, `127.0.0.1:8082`, `Public`)}
        token={text(`JWT token`, `1234567`, `Public`)}
        country="US"
        environment={
          select(`Environment`, environmentOptions, 'sandbox', `Public`) as any
        }
        debug
      />
    </>
  )
}

WithoutForm.parameters = {
  storyshots: { disable: true },
}
