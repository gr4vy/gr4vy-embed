import { test, expect } from '@playwright/test'

const html = String.raw

test('embed is able to load on the page', async ({ page }) => {
  // arrange
  await page.route('https://embed.demo.gr4vy.app/*', (route) => {
    /*
     * Return a mock page of embed ui, this will send the initial
     * post messages required to display Embed.
     */
    return route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: html`<html>
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

              document.write('Success') // write to the page so that it can be used to assert
            }
          })
        </script>
      </html>`,
    })
  })

  // act
  await page.goto('/example-cdn')

  // assert
  const iframe = page.frameLocator('iframe').locator('body')
  await expect(await iframe.innerText()).toBe('Success')
  await expect(await page.locator('.gr4vy__skeleton')).not.toBeVisible()
  await expect(await (await page.locator('iframe').boundingBox()).height).toBe(
    100
  ) // ensure the height of the iframe has been changed
})
