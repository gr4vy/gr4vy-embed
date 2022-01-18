# v2.7.0 (Tue Jan 18 2022)

### Release Notes

#### Add support for custom transaction statement descriptors ([#52](https://github.com/gr4vy/gr4vy-embed/pull/52))

Allows for the pass through of a statement descriptor object. The statement descriptor is the text to be shown on the buyer's statements.

---

#### 🚀 Enhancement

- Add support for custom transaction statement descriptors [#52](https://github.com/gr4vy/gr4vy-embed/pull/52) ([@gryevns](https://github.com/gryevns))

#### Authors: 1

- Gary Evans ([@gryevns](https://github.com/gryevns))

---

# v2.6.1 (Wed Jan 12 2022)

#### 🐛 Bug Fix

- fix: update cart items typo in readme [#57](https://github.com/gr4vy/gr4vy-embed/pull/57) ([@gryevns](https://github.com/gryevns))

#### Authors: 1

- Gary Evans ([@gryevns](https://github.com/gryevns))

---

# v2.6.0 (Tue Jan 11 2022)

#### 🚀 Enhancement

- Support for transactionFailed event when using onEvent [#56](https://github.com/gr4vy/gr4vy-embed/pull/56) ([@douglaseggleton](https://github.com/douglaseggleton) [@cbetta](https://github.com/cbetta))
- feat(cart items): add support for cart items pass through [#51](https://github.com/gr4vy/gr4vy-embed/pull/51) ([@gryevns](https://github.com/gryevns))
- Added support for optionsLoaded event [#55](https://github.com/gr4vy/gr4vy-embed/pull/55) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 3

- Cristiano Betta ([@cbetta](https://github.com/cbetta))
- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))
- Gary Evans ([@gryevns](https://github.com/gryevns))

---

# v2.5.0 (Wed Dec 22 2021)

### Release Notes

#### Add support for transactionCancelled event ([#49](https://github.com/gr4vy/gr4vy-embed/pull/49))

Adds support for `transactionCancelled` event. This event occurs when a buyer explicitly cancels a transaction. This could be before/or after the transaction is created. This is currently not supported for cancelling transactions during 3-D Secure.

---

#### 🚀 Enhancement

- Add support for transactionCancelled event [#49](https://github.com/gr4vy/gr4vy-embed/pull/49) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

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

- feat: support for optional form [#46](https://github.com/gr4vy/gr4vy-embed/pull/46) ([@douglaseggleton](https://github.com/douglaseggleton))

#### 🐛 Bug Fix

- fix: embed does not re-render when props change [#45](https://github.com/gr4vy/gr4vy-embed/pull/45) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v2.3.0 (Tue Dec 14 2021)

#### 🚀 Enhancement

- feat: add metadata support [#44](https://github.com/gr4vy/gr4vy-embed/pull/44) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v2.2.0 (Tue Dec 14 2021)

#### 🚀 Enhancement

- feat: add custom options [#43](https://github.com/gr4vy/gr4vy-embed/pull/43) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

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

# v1.4.2 (Tue Oct 26 2021)

#### 🐛 Bug Fix

- Add support for supportsTokenization display value [#30](https://github.com/gr4vy/gr4vy-embed/pull/30) ([@douglaseggleton](https://github.com/douglaseggleton))

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

# v1.3.9 (Tue Aug 24 2021)

#### 🏠 Internal

- Upgrade dependencies [#23](https://github.com/gr4vy/gr4vy-embed/pull/23) ([@douglaseggleton](https://github.com/douglaseggleton))

#### 📝 Documentation

- Remove approve intent from documentation [#19](https://github.com/gr4vy/gr4vy-embed/pull/19) ([@alibeylan](https://github.com/alibeylan))

#### Authors: 2

- Alicia Beylan ([@alibeylan](https://github.com/alibeylan))
- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v1.3.6 (Tue Jul 27 2021)

#### 🐛 Bug Fix

- ci: add auto for release management [#13](https://github.com/gr4vy/gr4vy-embed/pull/13) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))
