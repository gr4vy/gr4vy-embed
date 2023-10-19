import { SetupConfig, Config } from './types'
import { hostToUrl, appendUrlParams } from './utils'
import { generateChannelId } from './utils/generate-channel-id'

export const createConfig = (setupConfig: SetupConfig) => {
  const { gr4vyId, environment, ...rest } = setupConfig

  const channel = generateChannelId()
  const environmentPrefix = environment === 'sandbox' ? 'sandbox.' : ''
  const iframeHost = gr4vyId
    ? `embed.${environmentPrefix}${gr4vyId}.gr4vy.app`
    : setupConfig.iframeHost
  const apiHost = gr4vyId
    ? `api.${environmentPrefix}${gr4vyId}.gr4vy.app`
    : setupConfig.apiHost
  const iframeUrl = hostToUrl(iframeHost, setupConfig.secure)

  const form = !(setupConfig.form instanceof Element)
    ? document.querySelector(setupConfig.form)
    : setupConfig.form

  const element: unknown = !(setupConfig.element instanceof Element)
    ? document.querySelector(setupConfig.element)
    : setupConfig.element

  return {
    enableAnimations: false,
    requireSecurityCode: false,
    showDeleteButton: false,
    store: 'ask',
    display: 'all',
    apiHost,
    apiUrl: hostToUrl(apiHost, setupConfig.secure),
    gr4vyId,
    iframeHost,
    iframeUrl,
    iframeSrc: appendUrlParams(iframeUrl, {
      parentUrl: `${document.location.protocol}//${document.location.host}`,
      font: setupConfig.theme?.fonts?.body
        ? encodeURIComponent(setupConfig.theme.fonts.body)
        : undefined,
      channel,
    }),
    channel,
    ...rest,
    element,
    form,
    environment,
    redirectMode: setupConfig.redirectMode || 'fallback',
  } as Config
}
