import { SubjectManager } from '../subjects'
import { createTheme, injectThemeVariables } from '../theme'

const html = String.raw

let isFirstLoad = true

export const createSkeletonController = (
  element: HTMLDivElement,
  subject: SubjectManager,
  theme: any
) => {
  if (isFirstLoad) {
    require('./skeleton.css')
    isFirstLoad = false
  }

  if (theme) {
    injectThemeVariables(createTheme(theme), element)
  }

  element.innerHTML = html`<div class="gr4vy__container">
    <div class="gr4vy__skeleton">
      <div class="gr4vy__skeleton__radio"></div>
      <div class="gr4vy__skeleton__block"></div>
    </div>
    <div class="gr4vy__skeleton">
      <div class="gr4vy__skeleton__radio"></div>
      <div class="gr4vy__skeleton__block"></div>
    </div>
  </div>`

  subject.optionsLoaded$.subscribe(() => element.remove())
}
