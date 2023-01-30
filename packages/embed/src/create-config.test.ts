import { createConfig } from './create-config'
import { SetupConfig } from './types'
import { generateChannelId } from './utils/generate-channel-id'

const CHANNEL_ID = '123345345'
const globalDocument = global.document

const mockElement = globalDocument.createElement('div')
const mockForm = globalDocument.createElement('form')

beforeAll(() => {
  delete global.document
  global.document = {
    location: {
      protocol: 'https:',
      host: 'test.com',
    },
    querySelector: (query) => {
      if (query === '#app') {
        return mockElement
      }
      if (query === '#form') {
        return mockForm
      }
    },
  } as any
})

afterAll(() => {
  global.document = globalDocument
})

jest.mock('./utils/generate-channel-id')
;(generateChannelId as jest.Mock).mockReturnValue(CHANNEL_ID)

const setupConfig: Readonly<SetupConfig> = Object.freeze({
  amount: 100,
  currency: 'GBP',
  token: '123',
  country: 'GB',
  form: '#form',
  element: '#app',
  gr4vyId: 'test',
})

test('default configuration', () => {
  expect(createConfig(setupConfig)).toEqual({
    amount: 100,
    apiHost: 'api.test.gr4vy.app',
    apiUrl: 'https://api.test.gr4vy.app',
    channel: CHANNEL_ID,
    country: 'GB',
    currency: 'GBP',
    display: 'all',
    element: mockElement,
    form: mockForm,
    iframeHost: 'embed.test.gr4vy.app',
    iframeUrl: `https://embed.test.gr4vy.app`,
    redirectMode: 'fallback',
    iframeSrc: `https://embed.test.gr4vy.app/?parentUrl=https%3A%2F%2Ftest.com&channel=${CHANNEL_ID}`,
    store: 'ask',
    token: '123',
    environment: undefined,
    gr4vyId: 'test',
    requireSecurityCode: false,
  })
})

test('should set url values based on a gr4vy id', () => {
  expect(createConfig(setupConfig)).toMatchObject({
    apiHost: `api.test.gr4vy.app`,
    apiUrl: `https://api.test.gr4vy.app`,
    iframeHost: `embed.test.gr4vy.app`,
    iframeUrl: `https://embed.test.gr4vy.app`,
    iframeSrc: `https://embed.test.gr4vy.app/?parentUrl=https%3A%2F%2Ftest.com&channel=${CHANNEL_ID}`,
  })
})

test('should prefix URLs if for the sandbox environment', () => {
  expect(
    createConfig({ ...setupConfig, environment: 'sandbox' })
  ).toMatchObject({
    apiHost: `api.sandbox.test.gr4vy.app`,
    apiUrl: `https://api.sandbox.test.gr4vy.app`,
    iframeHost: `embed.sandbox.test.gr4vy.app`,
    iframeUrl: `https://embed.sandbox.test.gr4vy.app`,
    iframeSrc: `https://embed.sandbox.test.gr4vy.app/?parentUrl=https%3A%2F%2Ftest.com&channel=${CHANNEL_ID}`,
  })
})

test('should default store to "ask"', () => {
  expect(createConfig(setupConfig)).toMatchObject({
    store: 'ask',
  })
})

test('should set the font in the iframeUrl', () => {
  expect(
    createConfig({
      ...setupConfig,
      theme: {
        fonts: {
          body: 'Lato',
        },
      },
    })
  ).toMatchObject({
    iframeSrc: `https://embed.test.gr4vy.app/?parentUrl=https%3A%2F%2Ftest.com&font=Lato&channel=${CHANNEL_ID}`,
  })
})
