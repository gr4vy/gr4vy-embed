import { test, expect } from '@playwright/test'

const html = String.raw

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
  await page.goto('/example-cdn')

  // assert
  const iframe = page.frameLocator('iframe').locator('body')
  await expect(await iframe.innerText()).toBe(
    '{"amount":1299,"currency":"USD","apiHost":"api.demo.gr4vy.app","gr4vyId":"demo","token":"123456","store":"ask","country":"US","display":"all","apiUrl":"https://api.demo.gr4vy.app","supportedApplePayVersion":0,"supportedGooglePayVersion":1}'
  )
  await expect(await page.locator('.gr4vy__skeleton')).not.toBeVisible()
  await expect(await (await page.locator('iframe').boundingBox()).height).toBe(
    100
  ) // ensure the height of the iframe has been changed
})

const dataset = [
  ['country', 'GB', 'GB', null],
  ['currency', 'SEK', 'SEK', null],
  [
    'currency',
    323,
    null,
    'Gr4vy - Error {code: argumentError, argument: currency, message: 323 must be a valid currency format}',
  ],
  [
    'gr4vyId',
    null,
    null,
    'Gr4vy - Error {code: argumentError, argument: gr4vyId, message: null must be a valid gr4vyId or iframeHost/apiHost}',
  ],
  [
    'country',
    null,
    null,
    'Gr4vy - Error {code: argumentError, argument: country, message: null must be a string ISO country code}',
  ],
  ['amount', 0, 0, null],
  ['amount', 100, 100, null],
  [
    'amount',
    -1,
    null,
    'Gr4vy - Error {code: argumentError, argument: amount, message: -1 must be valid non-negative number}',
  ],
  [
    'amount',
    99999999999,
    null,
    'Gr4vy - Error {code: argumentError, argument: amount, message: 99999999999 must be valid non-negative number}',
  ],
]

dataset.forEach(([key, value, expected, error]) => {
  test(`should ${
    error ? 'raise an error' : `pass '${expected}' to embed ui`
  } when option '${key}' is '${value}'`, async ({ page }) => {
    // arrange
    const errors = []
    page.on('console', async (msg) => {
      errors.push(msg.text() || msg)
    })

    // act
    await page.goto(
      `/example-cdn?options=${Buffer.from(
        JSON.stringify({ [key]: value })
      ).toString('base64')}`
    )

    // assert
    const iframe = page.frameLocator('iframe').locator('body')
    if (!error) {
      await expect(JSON.parse(await iframe.innerText())[key]).toBe(expected)
    } else {
      await expect(errors).toEqual([error])
    }
  })
})
