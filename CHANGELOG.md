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
