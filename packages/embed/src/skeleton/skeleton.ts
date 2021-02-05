import { optionsLoaded$ } from '../subjects'
import './skeleton.css'

export const Skeleton = () => {
  const skeleton = document.createElement('div')
  skeleton.innerHTML = `
      <div class="gr4vy__container">
        <div class="gr4vy__loading"></div>
        <div class="gr4vy__skeleton">
          <div class="gr4vy__skeleton__radio"></div>
          <div class="gr4vy__skeleton__block"></div>
        </div>
        <div class="gr4vy__skeleton">
          <div class="gr4vy__skeleton__radio"></div>
          <div class="gr4vy__skeleton__block"></div>
        </div>
      </div>
      `
  return skeleton
}

export const createSkeletonController = (element: HTMLDivElement) => {
  optionsLoaded$.subscribe(() => element.remove())
}
