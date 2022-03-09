# v2.8.2 (Wed Mar 09 2022)

#### 🐛 Bug Fix

- `@gr4vy/embed`
  - Show the loading state for Google Pay [#69](https://github.com/gr4vy/gr4vy-embed/pull/69) ([@tculigGr4vy](https://github.com/tculigGr4vy))

#### Authors: 1

- Tihomir ([@tculigGr4vy](https://github.com/tculigGr4vy))

---

# v2.8.1 (Tue Feb 08 2022)

#### 🐛 Bug Fix

- `@gr4vy/embed`
  - Pass through environment option to Embed UI [#64](https://github.com/gr4vy/gr4vy-embed/pull/64) ([@thomas-gr4vy](https://github.com/thomas-gr4vy))

#### Authors: 1

- [@thomas-gr4vy](https://github.com/thomas-gr4vy)

---

# v2.8.0 (Fri Feb 04 2022)

#### 🚀 Enhancement

- `@gr4vy/embed`
  - Add support for Google Pay [#61](https://github.com/gr4vy/gr4vy-embed/pull/61) ([@thomas-gr4vy](https://github.com/thomas-gr4vy))

#### Authors: 1

- [@thomas-gr4vy](https://github.com/thomas-gr4vy)

---

# v2.7.1 (Wed Jan 26 2022)

#### 🐛 Bug Fix

- `@gr4vy/embed`
  - Amount validation updated to match API maximum (99999999) [#63](https://github.com/gr4vy/gr4vy-embed/pull/63) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v2.7.0 (Tue Jan 18 2022)

### Release Notes

#### Add support for custom transaction statement descriptors ([#52](https://github.com/gr4vy/gr4vy-embed/pull/52))

Allows for the pass through of a statement descriptor object. The statement descriptor is the text to be shown on the buyer's statements.

---

#### 🚀 Enhancement

- `@gr4vy/embed-react`, `@gr4vy/embed`
  - Add support for custom transaction statement descriptors [#52](https://github.com/gr4vy/gr4vy-embed/pull/52) ([@gryevns](https://github.com/gryevns))

#### 🐛 Bug Fix

- chore: CVE-2022-0155 [#58](https://github.com/gr4vy/gr4vy-embed/pull/58) ([@gryevns](https://github.com/gryevns))

#### 📝 Documentation

- Updated contribution guidelines [#60](https://github.com/gr4vy/gr4vy-embed/pull/60) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 2

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))
- Gary Evans ([@gryevns](https://github.com/gryevns))

---

# v2.6.1 (Wed Jan 12 2022)

#### 🐛 Bug Fix

- `@gr4vy/embed-react`, `@gr4vy/embed`
  - fix: update cart items typo in readme [#57](https://github.com/gr4vy/gr4vy-embed/pull/57) ([@gryevns](https://github.com/gryevns))

#### Authors: 1

- Gary Evans ([@gryevns](https://github.com/gryevns))

---

# v2.6.0 (Tue Jan 11 2022)

#### 🚀 Enhancement

- `@gr4vy/embed-react`, `@gr4vy/embed`
  - Support for transactionFailed event when using onEvent [#56](https://github.com/gr4vy/gr4vy-embed/pull/56) ([@douglaseggleton](https://github.com/douglaseggleton) [@cbetta](https://github.com/cbetta))
  - feat(cart items): add support for cart items pass through [#51](https://github.com/gr4vy/gr4vy-embed/pull/51) ([@gryevns](https://github.com/gryevns))
  - Added support for optionsLoaded event [#55](https://github.com/gr4vy/gr4vy-embed/pull/55) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 3

- Cristiano Betta ([@cbetta](https://github.com/cbetta))
- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))
- Gary Evans ([@gryevns](https://github.com/gryevns))

---

# v2.5.1 (Mon Jan 10 2022)

#### 🐛 Bug Fix

- `@gr4vy/embed`
  - Skeleton loader updated to fill the entire width of its container [#53](https://github.com/gr4vy/gr4vy-embed/pull/53) ([@thomas-gr4vy](https://github.com/thomas-gr4vy))

#### 🏠 Internal

- fix: add postcss to trivyignore [#54](https://github.com/gr4vy/gr4vy-embed/pull/54) ([@thomas-gr4vy](https://github.com/thomas-gr4vy))

#### Authors: 1

- [@thomas-gr4vy](https://github.com/thomas-gr4vy)

---

# v2.5.0 (Wed Dec 22 2021)

### Release Notes

#### Add support for transactionCancelled event ([#49](https://github.com/gr4vy/gr4vy-embed/pull/49))

Adds support for `transactionCancelled` event. This event occurs when a buyer explicitly cancels a transaction. This could be before/or after the transaction is created. This is currently not supported for cancelling transactions during 3-D Secure.

#### Add support for payment source ([#48](https://github.com/gr4vy/gr4vy-embed/pull/48))

Adds support for `paymentSource` to indicate to the underlying PSP the nature of a transaction/payment. This will override the `store` parameter (it will be set to `true` if paymentSource is set) and also for `display` to `supportsTokenization`. The `paymentSource` can be set to either `installment` or `recurring`.

#### Radio input theme support ([#47](https://github.com/gr4vy/gr4vy-embed/pull/47))

Adds support for theming radio inputs using `inputRadioBorder` and `inputRadioBorderChecked`, if these are not defined the previous default values will be used (no visual breaking changes).

---

#### 🚀 Enhancement

- `@gr4vy/embed`
  - Remove required description, iconUrl props for custom options [#50](https://github.com/gr4vy/gr4vy-embed/pull/50) ([@douglaseggleton](https://github.com/douglaseggleton))
  - Add support for payment source [#48](https://github.com/gr4vy/gr4vy-embed/pull/48) ([@douglaseggleton](https://github.com/douglaseggleton) [@cbetta](https://github.com/cbetta))
  - Radio input theme support [#47](https://github.com/gr4vy/gr4vy-embed/pull/47) ([@douglaseggleton](https://github.com/douglaseggleton))
- `@gr4vy/embed-react`, `@gr4vy/embed`
  - Add support for transactionCancelled event [#49](https://github.com/gr4vy/gr4vy-embed/pull/49) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 2

- Cristiano Betta ([@cbetta](https://github.com/cbetta))
- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v2.4.0 (Thu Dec 16 2021)

### Release Notes

#### feat: support for optional form ([#46](https://github.com/gr4vy/gr4vy-embed/pull/46))

Form is no longer a required prop, but `onComplete` should be used. This allows a merchant to have more control over how their own form is submitted.

#### fix: embed does not re-render when props change ([#45](https://github.com/gr4vy/gr4vy-embed/pull/45))

Embed React will now re-render on prop changes. This uses React `memo` with a deep comparison of props so nested objects, such as `theme` will still cause a re-render if changed.

---

#### 🚀 Enhancement

- `@gr4vy/embed-react`, `@gr4vy/embed`
  - feat: support for optional form [#46](https://github.com/gr4vy/gr4vy-embed/pull/46) ([@douglaseggleton](https://github.com/douglaseggleton))

#### 🐛 Bug Fix

- `@gr4vy/embed-react`
  - fix: embed does not re-render when props change [#45](https://github.com/gr4vy/gr4vy-embed/pull/45) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v2.3.0 (Tue Dec 14 2021)

#### 🚀 Enhancement

- `@gr4vy/embed-react`, `@gr4vy/embed`
  - feat: add metadata support [#44](https://github.com/gr4vy/gr4vy-embed/pull/44) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v2.2.0 (Tue Dec 14 2021)

#### 🚀 Enhancement

- `@gr4vy/embed-react`, `@gr4vy/embed`
  - feat: add custom options [#43](https://github.com/gr4vy/gr4vy-embed/pull/43) ([@douglaseggleton](https://github.com/douglaseggleton))

#### ⚠️ Pushed to `main`

- Auto-deploy to spider [skip-ci] ([@andrewmackett](https://github.com/andrewmackett))

#### Authors: 2

- Andrew Mackett ([@andrewmackett](https://github.com/andrewmackett))
- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v2.1.0 (Thu Nov 18 2021)

#### 🚀 Enhancement

- `@gr4vy/embed-react`, `@gr4vy/embed`
  - refactor: remove prefer response [#40](https://github.com/gr4vy/gr4vy-embed/pull/40) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v2.0.0 (Thu Nov 18 2021)

### Release Notes

#### Change environment usage to point at different URLs ([#39](https://github.com/gr4vy/gr4vy-embed/pull/39))

The `environment` property can now only be set to either `production` or `sandbox`. The `sandbox` value is a new value that replaces both the `development` and 'staging` values that were previously used. The `environment` variable will now be used to connect to the right Gr4vy instance.

---

#### 💥 Breaking Change

- `@gr4vy/embed-react`, `@gr4vy/embed`
  - Change environment usage to point at different URLs [#39](https://github.com/gr4vy/gr4vy-embed/pull/39) ([@cbetta](https://github.com/cbetta))

#### Authors: 1

- Cristiano Betta ([@cbetta](https://github.com/cbetta))

---

# v1.5.3 (Mon Nov 15 2021)

#### 🐛 Bug Fix

- `@gr4vy/embed`
  - fix: update async tests [#38](https://github.com/gr4vy/gr4vy-embed/pull/38) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.5.2 (Mon Nov 08 2021)

#### 🐛 Bug Fix

- `@gr4vy/embed`
  - Fixes apple pay complete event pass-through [#36](https://github.com/gr4vy/gr4vy-embed/pull/36) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.5.1 (Mon Nov 08 2021)

### Release Notes

#### Resolves issues cancelling Apple Pay ([#35](https://github.com/gr4vy/gr4vy-embed/pull/35))

Dismissing Apple Pay previously left the checkout in a pending state when the user dismissed the payment sheet. This also resolves the issue of the transaction being completed before the payment sheet has closed.

---

#### 🐛 Bug Fix

- `@gr4vy/embed`
  - Resolves issues cancelling Apple Pay [#35](https://github.com/gr4vy/gr4vy-embed/pull/35) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.5.0 (Fri Nov 05 2021)

#### 🚀 Enhancement

- `@gr4vy/embed`
  - Add support for Apple Pay [#34](https://github.com/gr4vy/gr4vy-embed/pull/34) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.4.4 (Tue Nov 02 2021)

#### 🐛 Bug Fix

- `@gr4vy/embed`
  - fix: update theme type with missing label text [#33](https://github.com/gr4vy/gr4vy-embed/pull/33) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.4.3 (Thu Oct 28 2021)

#### 🐛 Bug Fix

- ci: update timeouts [#31](https://github.com/gr4vy/gr4vy-embed/pull/31) ([@douglaseggleton](https://github.com/douglaseggleton))
- `@gr4vy/embed`
  - Fix skeleton styles to respect theme values [#32](https://github.com/gr4vy/gr4vy-embed/pull/32) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.4.2 (Tue Oct 26 2021)

#### 🐛 Bug Fix

- `@gr4vy/embed-react`, `@gr4vy/embed`
  - Add support for supportsTokenization display value [#30](https://github.com/gr4vy/gr4vy-embed/pull/30) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.4.1 (Wed Oct 20 2021)

#### 🐛 Bug Fix

- `@gr4vy/embed`
  - feat: add event paymentMethodSelected [#29](https://github.com/gr4vy/gr4vy-embed/pull/29) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.4.0 (Tue Oct 19 2021)

#### 🚀 Enhancement

- `@gr4vy/embed-react`, `@gr4vy/embed`
  - Remove mentions of unsupported `showButton` prop (TA-277) [#28](https://github.com/gr4vy/gr4vy-embed/pull/28) ([@cbetta](https://github.com/cbetta) [@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 2

- Cristiano Betta ([@cbetta](https://github.com/cbetta))
- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.3.10 (Fri Aug 27 2021)

#### 🐛 Bug Fix

- `@gr4vy/embed`
  - feat: add ui support for three d secure [#22](https://github.com/gr4vy/gr4vy-embed/pull/22) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.3.9 (Tue Aug 24 2021)

#### 🐛 Bug Fix

- Update dependencies [#24](https://github.com/gr4vy/gr4vy-embed/pull/24) ([@douglaseggleton](https://github.com/douglaseggleton))
- Add Trivy GitHub action job [#21](https://github.com/gr4vy/gr4vy-embed/pull/21) ([@andrewmackett](https://github.com/andrewmackett))

#### 🏠 Internal

- Add .trivyignore file [#20](https://github.com/gr4vy/gr4vy-embed/pull/20) ([@andrewmackett](https://github.com/andrewmackett))
- `@gr4vy/embed-react`
  - Upgrade dependencies [#23](https://github.com/gr4vy/gr4vy-embed/pull/23) ([@douglaseggleton](https://github.com/douglaseggleton))

#### 📝 Documentation

- `@gr4vy/embed-react`, `@gr4vy/embed`
  - Remove approve intent from documentation [#19](https://github.com/gr4vy/gr4vy-embed/pull/19) ([@alibeylan](https://github.com/alibeylan))

#### Authors: 3

- Alicia Beylan ([@alibeylan](https://github.com/alibeylan))
- Andrew Mackett ([@andrewmackett](https://github.com/andrewmackett))
- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.3.8 (Mon Aug 02 2021)

#### 🐛 Bug Fix

- `@gr4vy/embed`
  - refactor: replace framebus with postMessage [#18](https://github.com/gr4vy/gr4vy-embed/pull/18) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.3.7 (Tue Jul 27 2021)

#### 🐛 Bug Fix

- Release [#17](https://github.com/gr4vy/gr4vy-embed/pull/17) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.3.6 (Tue Jul 27 2021)

#### 🐛 Bug Fix

- add author [#14](https://github.com/gr4vy/gr4vy-embed/pull/14) ([@douglaseggleton](https://github.com/douglaseggleton))
- `@gr4vy/embed-react`, `@gr4vy/embed`
  - ci: add auto for release management [#13](https://github.com/gr4vy/gr4vy-embed/pull/13) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))
