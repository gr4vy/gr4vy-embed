# v2.1.0 (Thu Nov 18 2021)

#### 🚀 Enhancement

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

- Change environment usage to point at different URLs [#39](https://github.com/gr4vy/gr4vy-embed/pull/39) ([@cbetta](https://github.com/cbetta))

#### Authors: 1

- Cristiano Betta ([@cbetta](https://github.com/cbetta))

---

# v1.5.3 (Mon Nov 15 2021)

#### 🐛 Bug Fix

- fix: update async tests [#38](https://github.com/gr4vy/gr4vy-embed/pull/38) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.5.2 (Mon Nov 08 2021)

#### 🐛 Bug Fix

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

- Resolves issues cancelling Apple Pay [#35](https://github.com/gr4vy/gr4vy-embed/pull/35) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.5.0 (Fri Nov 05 2021)

#### 🚀 Enhancement

- Add support for Apple Pay [#34](https://github.com/gr4vy/gr4vy-embed/pull/34) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.4.4 (Tue Nov 02 2021)

#### 🐛 Bug Fix

- fix: update theme type with missing label text [#33](https://github.com/gr4vy/gr4vy-embed/pull/33) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.4.3 (Thu Oct 28 2021)

#### 🐛 Bug Fix

- Fix skeleton styles to respect theme values [#32](https://github.com/gr4vy/gr4vy-embed/pull/32) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.4.2 (Tue Oct 26 2021)

#### 🐛 Bug Fix

- Add support for supportsTokenization display value [#30](https://github.com/gr4vy/gr4vy-embed/pull/30) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.4.1 (Wed Oct 20 2021)

#### 🐛 Bug Fix

- feat: add event paymentMethodSelected [#29](https://github.com/gr4vy/gr4vy-embed/pull/29) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.4.0 (Tue Oct 19 2021)

#### 🚀 Enhancement

- Remove mentions of unsupported `showButton` prop (TA-277) [#28](https://github.com/gr4vy/gr4vy-embed/pull/28) ([@cbetta](https://github.com/cbetta) [@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 2

- Cristiano Betta ([@cbetta](https://github.com/cbetta))
- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.3.10 (Fri Aug 27 2021)

#### 🐛 Bug Fix

- feat: add ui support for three d secure [#22](https://github.com/gr4vy/gr4vy-embed/pull/22) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.3.9 (Tue Aug 24 2021)

#### 📝 Documentation

- Remove approve intent from documentation [#19](https://github.com/gr4vy/gr4vy-embed/pull/19) ([@alibeylan](https://github.com/alibeylan))

#### Authors: 1

- Alicia Beylan ([@alibeylan](https://github.com/alibeylan))

---

# v1.3.8 (Mon Aug 02 2021)

#### 🐛 Bug Fix

- refactor: replace framebus with postMessage [#18](https://github.com/gr4vy/gr4vy-embed/pull/18) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.3.6 (Tue Jul 27 2021)

#### 🐛 Bug Fix

- ci: add auto for release management [#13](https://github.com/gr4vy/gr4vy-embed/pull/13) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))
