import { test, expect, type Page } from '@playwright/test'

const html = String.raw

// The mocked embed-ui iframe below only writes its body once it's received
// the `updateOptions` postMessage from Gr4vy Embed, an async round-trip that
// hasn't necessarily finished by the time the page's own navigation
// settles. Poll until there's something to parse.
const getIframeData = async (page: Page) => {
  const iframe = page.frameLocator('iframe').locator('body')
  await expect(iframe).not.toBeEmpty()
  return JSON.parse(await iframe.innerText())
}

const EMBED_UI_TEMPLATE = html`<html>
  <script>
    const href = new URL(document.location.href)
    const parentUrl = href.searchParams.get('parentUrl')
    const parentOrigin = new URL(parentUrl).origin
    const channel = href.searchParams.get('channel')

    /*
     * Send a message to Gr4vy Embed to communicate Embed UI is ready
     * to start receiving messages.
     */
    window.parent.postMessage(
      { type: 'frameReady', channel, data: { version: 123 } },
      parentOrigin
    )

    /*
     * Listen to messages coming from Gr4vy Embed. When the initial set of
     * options have been received send a reply to indicate Embed UI has loaded.
     */
    window.addEventListener('message', ({ data: message }) => {
      if (message?.type === 'updateOptions') {
        window.parent.postMessage(
          { type: 'optionsLoaded', channel },
          parentOrigin
        )
        window.parent.postMessage(
          { type: 'resize', channel, data: { frame: { height: 100 } } },
          parentOrigin
        )

        document.write(JSON.stringify(message.data)) // write to the page so that it can be used to assert
      }
    })
  </script>
</html>`

test.beforeEach(async ({ page }) => {
  await page.route('https://embed.demo.gr4vy.app/*', (route) => {
    /*
     * Return a mock page of embed ui, this will send the initial
     * post messages required to display Embed.
     */
    return route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: EMBED_UI_TEMPLATE,
    })
  })
})

test('embed is able to load on the page', async ({ page }) => {
  // act
  // 'load' never resolves here: the browser only fires it once every nested
  // iframe has also fired its own 'load', and the mocked embed-ui iframe
  // (routed via page.route above) doesn't reliably do so - 'domcontentloaded'
  // is enough since the assertions below already poll for the real content.
  await page.goto('', { waitUntil: 'domcontentloaded' })

  // assert
  await expect(await getIframeData(page)).toEqual({
    allowLocalNetworkAccess: false,
    amount: 1299,
    currency: 'USD',
    apiHost: 'api.demo.gr4vy.app',
    gr4vyId: 'demo',
    token: '123456',
    store: 'ask',
    country: 'US',
    display: 'all',
    apiUrl: 'https://api.demo.gr4vy.app',
    requireSecurityCode: false,
    showDeleteButton: false,
    enableAnimations: false,
    separatePaymentOptions: false,
    compactPaymentOptions: false,
    supportedApplePayVersion: 0,
    supportedGooglePayVersion: 1,
    hasBeforeTransaction: false,
  })
  await expect(await page.locator('.gr4vy__skeleton')).not.toBeVisible()
  await expect(await (await page.locator('iframe').boundingBox()).height).toBe(
    100
  ) // ensure the height of the iframe has been changed
})

const dataset = [
  ['country', 'GB'],
  ['currency', 'SEK'],
  ['amount', 0],
  ['amount', 100],
]

dataset.forEach(([key, value]) => {
  test(`should pass option '${key}' with value '${value}' to embed ui`, async ({
    page,
  }) => {
    // arrange
    const errors = []
    page.on('console', async (msg) => {
      errors.push(msg.text() || msg)
    })

    // act
    await page.goto(
      `?options=${Buffer.from(JSON.stringify({ [key]: value })).toString(
        'base64'
      )}`,
      { waitUntil: 'domcontentloaded' }
    )

    // assert
    await expect((await getIframeData(page))[key]).toBe(value)
  })
})

test(`should pass a buyer id with shipping details id`, async ({ page }) => {
  // arrange
  const errors = []
  page.on('console', async (msg) => {
    errors.push(msg.text() || msg)
  })

  // act
  await page.goto(
    `?options=${Buffer.from(
      JSON.stringify({
        buyerId: '1e8b009c-6d3f-44c5-8668-3c3d0537ce72',
        shippingDetailsId: '2b39ff28-22c5-4847-a355-e3bcdc3137b7',
      })
    ).toString('base64')}`,
    { waitUntil: 'domcontentloaded' }
  )

  // assert
  const data = await getIframeData(page)
  await expect(data['buyerId']).toBe('1e8b009c-6d3f-44c5-8668-3c3d0537ce72')
  await expect(data['shippingDetailsId']).toBe(
    '2b39ff28-22c5-4847-a355-e3bcdc3137b7'
  )
})

test(`should pass a connectionOptions`, async ({ page }) => {
  // arrange
  const errors = []
  page.on('console', (msg) => {
    errors.push(msg.text() || msg)
  })

  // act
  await page.goto(
    `?options=${Buffer.from(
      JSON.stringify({
        connectionOptions: { foo: 'bar' },
      })
    ).toString('base64')}`,
    { waitUntil: 'domcontentloaded' }
  )

  // assert
  await expect((await getIframeData(page))['connectionOptions']).toEqual({
    foo: 'bar',
  })
})
