import React, { useEffect, useRef, useState } from 'react'
import Gr4vyEmbed, { EmbedInstance } from './'
import type { Meta, StoryObj } from '@storybook/react'

const defaultArgs = {
  amount: 1299,
  environment: 'sandbox',
  intent: 'capture',
  currency: 'USD',
  apiHost: '127.0.0.1:3100',
  iframeHost: '127.0.0.1:8082',
  token: '1234567',
  country: 'US',
} as const

const meta: Meta<typeof Gr4vyEmbed> = {
  title: 'Embed React',
  component: Gr4vyEmbed,
  argTypes: {
    country: {
      options: ['US', 'GB', 'FR'],
      control: { type: 'radio' },
    },
    currency: {
      options: ['USD', 'GBP', 'EUR'],
      control: { type: 'radio' },
    },
    intent: {
      options: ['capture', 'approve'],
      control: { type: 'radio' },
    },
    environment: {
      options: ['production', 'sandbox'],
      control: { type: 'radio' },
      defaultValue: 'sandbox',
    },
  },
}

export default meta

type Story = StoryObj<typeof Gr4vyEmbed>

const Template = ({ showRenderControls = false, props }) => {
  const form = useRef<HTMLFormElement>()
  const [formReady, setFormReady] = useState(false)
  const [amount, setAmount] = useState(props.amount)
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
          {...props}
          theme={{
            colors: {
              primary: color,
            },
          }}
          amount={amount}
          debug
        />
      )}
    </>
  )
}

export const Default: Story = {
  render: (props) => <Template props={props} />,
  args: defaultArgs,
}

export const RenderTest: Story = {
  render: (props) => <Template showRenderControls={true} props={props} />,
  args: defaultArgs,
}

export const WithoutForm: Story = {
  render: (props) => {
    const embed = useRef<EmbedInstance>()
    return (
      <>
        <button onClick={() => embed.current.submit()}>Submit</button>
        <Gr4vyEmbed ref={embed} {...(props as any)} debug />
      </>
    )
  },
  args: defaultArgs,
}
