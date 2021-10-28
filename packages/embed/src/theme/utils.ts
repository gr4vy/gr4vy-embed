export const themeToVars = (theme: Record<string, Record<string, any>>) => {
  const vars = []
  Object.keys(theme).forEach((parentKey) => {
    Object.keys(theme[parentKey]).forEach((childKey) => {
      vars.push([
        `--gr4vy-${parentKey}-${childKey}`,
        `${theme[parentKey][childKey]}`,
      ])
    })
  })
  return vars
}

export const injectThemeVariables = (theme, element) => {
  // cleanup existing variables
  element.removeAttribute('style')

  themeToVars(theme).forEach(([key, value]) =>
    element.style.setProperty(key, value)
  )
}
