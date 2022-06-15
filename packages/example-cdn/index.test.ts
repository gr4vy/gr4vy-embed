import { test, expect } from '@playwright/test'

const html = String.raw

test('embed is able to load on the page', async ({ page }) => {
  await page.route('https://embed.demo.gr4vy.app/*', (route) => {
    return route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: html`<html>
        <script>
          const href = new URL(document.location.href)
          const parentUrl = href.searchParams.get('parentUrl')
          const parentOrigin = new URL(parentUrl).origin
          const channel = href.searchParams.get('channel')

          window.parent.postMessage(
            { type: 'frameReady', channel },
            parentOrigin
          )

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
              document.write('Success')
            }
          })
        </script>
      </html>`,
    })
  })

  await page.goto('/example-cdn')

  const iframe = page.frameLocator('iframe').locator('body')

  await expect(await iframe.innerText()).toBe('Success')
  await expect(await page.locator('.gr4vy__skeleton')).not.toBeVisible()
  await expect(await (await page.locator('iframe').boundingBox()).height).toBe(
    100
  )
})
