import { SetupConfig, Config } from './types'
import { hostToUrl, appendUrlParams, resolveTopLevelUrl } from './utils'
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
    separatePaymentOptions: false,
    compactPaymentOptions: false,
    requireSecurityCode: false,
    showDeleteButton: false,
    allowLocalNetworkAccess: false,
    store: 'ask',
    display: 'all',
    apiHost,
    apiUrl: hostToUrl(apiHost, setupConfig.secure),
    gr4vyId,
    iframeHost,
    iframeUrl,
    iframeSrc: appendUrlParams(iframeUrl, {
      parentUrl: `${document.location.protocol}//${document.location.host}`,
      // The top-level page, which differs from `parentUrl` only when the host
      // page is itself framed. Wallets validate against this, not `parentUrl`.
      // `parentUrl` stays the immediate parent because it is also what the
      // iframe targets its postMessage calls at.
      topLevelUrl: setupConfig.topLevelUrl ?? resolveTopLevelUrl(),
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
