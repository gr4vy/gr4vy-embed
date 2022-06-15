import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  timeout: 70000,
  webServer: {
    command: 'yarn start:ci',
    url: 'http://localhost:9000',
    timeout: 120 * 1000,
  },
  use: {
    baseURL: 'http://localhost:9000',
  },
}
export default config
