import { SubjectManager } from '../subjects'

const html = String.raw

let isFirstLoad = true

export const createSkeletonController = (
  element: HTMLDivElement,
  subject: SubjectManager
) => {
  if (isFirstLoad) {
    require('./skeleton.css')
    isFirstLoad = false
  }

  element.innerHTML = html`<div class="gr4vy__container">
    <div class="gr4vy__loading"></div>
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
