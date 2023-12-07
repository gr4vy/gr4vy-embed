# v2.25.0 (Thu Dec 07 2023)

#### 🚀 Enhancement

- feat: add excluded methods option [#172](https://github.com/gr4vy/gr4vy-embed/pull/172) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v2.24.6 (Mon Nov 20 2023)

#### 🔩 Dependency Updates

- deps: upgrade lerna/typescript/jest [#170](https://github.com/gr4vy/gr4vy-embed/pull/170) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v2.24.4 (Thu Nov 16 2023)

#### 🔩 Dependency Updates

- chore: upgrade storybook dependencies [#166](https://github.com/gr4vy/gr4vy-embed/pull/166) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v2.22.2 (Thu Apr 20 2023)

#### 🐛 Bug Fix

- fix: webpack dev server [#142](https://github.com/gr4vy/gr4vy-embed/pull/142) ([@theturboboy](https://github.com/theturboboy))

#### Authors: 1

- Andrei Haidukevich ([@theturboboy](https://github.com/theturboboy))

---

# v2.22.0 (Mon Apr 17 2023)

#### 🚀 Enhancement

- feat: add optional merchant account ID [#141](https://github.com/gr4vy/gr4vy-embed/pull/141) ([@theturboboy](https://github.com/theturboboy))

#### Authors: 1

- Andrei Haidukevich ([@theturboboy](https://github.com/theturboboy))

---

# v2.20.0 (Thu Mar 16 2023)

#### 🚀 Enhancement

- feat: allow shippingDetailsId to be updated within onBeforeTransaction callback [#138](https://github.com/gr4vy/gr4vy-embed/pull/138) ([@theturboboy](https://github.com/theturboboy))

#### Authors: 1

- Andrei Haidukevich ([@theturboboy](https://github.com/theturboboy))

---

# v2.19.0 (Fri Feb 17 2023)

#### 🚀 Enhancement

- feat: add delete payment option prop [#133](https://github.com/gr4vy/gr4vy-embed/pull/133) ([@luca-gr4vy](https://github.com/luca-gr4vy))

#### Authors: 1

- Luca Allievi ([@luca-gr4vy](https://github.com/luca-gr4vy))

---

# v2.18.0 (Fri Feb 10 2023)

#### 🚀 Enhancement

- feat: add support for onBeforeTransaction [#131](https://github.com/gr4vy/gr4vy-embed/pull/131) ([@douglaseggleton](https://github.com/douglaseggleton))

#### 🏠 Internal

- chore: update default api host [#129](https://github.com/gr4vy/gr4vy-embed/pull/129) ([@luca-gr4vy](https://github.com/luca-gr4vy))

#### Authors: 2

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))
- Luca Allievi ([@luca-gr4vy](https://github.com/luca-gr4vy))

---

# v2.17.0 (Tue Jan 31 2023)

#### 🚀 Enhancement

- feat: add support for full page return url [#126](https://github.com/gr4vy/gr4vy-embed/pull/126) ([@douglaseggleton](https://github.com/douglaseggleton) [@cbetta](https://github.com/cbetta))

#### 🏠 Internal

- fix: dev mode terminal error [#127](https://github.com/gr4vy/gr4vy-embed/pull/127) ([@brunodesde1987](https://github.com/brunodesde1987))

#### Authors: 3

- Bruno Carvalho ([@brunodesde1987](https://github.com/brunodesde1987))
- Cristiano Betta ([@cbetta](https://github.com/cbetta))
- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v2.16.0 (Tue Dec 13 2022)

#### 🚀 Enhancement

- feat(connection-options): add support for connection options [#123](https://github.com/gr4vy/gr4vy-embed/pull/123) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v2.15.0 (Fri Dec 09 2022)

### Release Notes

#### feat(shipping-details): add support for shipping details id ([#122](https://github.com/gr4vy/gr4vy-embed/pull/122))

Allows merchants to supply an identifier for shipping details. Shipping details must belong to the buyer and will need to be provided via our API ahead of the transaction.

---

#### 🚀 Enhancement

- feat(shipping-details): add support for shipping details id [#122](https://github.com/gr4vy/gr4vy-embed/pull/122) ([@douglaseggleton](https://github.com/douglaseggleton))

#### 🏠 Internal

- chore: absolute imports (embed) [#117](https://github.com/gr4vy/gr4vy-embed/pull/117) ([@brunodesde1987](https://github.com/brunodesde1987))

#### Authors: 2

- Bruno Carvalho ([@brunodesde1987](https://github.com/brunodesde1987))
- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v2.12.0 (Thu Sep 01 2022)

#### 🚀 Enhancement

- feat(security-code): add support for security code for stored card me… [#103](https://github.com/gr4vy/gr4vy-embed/pull/103) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v2.11.7 (Fri Jul 08 2022)

#### 🐛 Bug Fix

- add moto as a payment source [#96](https://github.com/gr4vy/gr4vy-embed/pull/96) ([@douglaseggleton](https://github.com/douglaseggleton))

#### Authors: 1

- Douglas Eggleton ([@douglaseggleton](https://github.com/douglaseggleton))

---

# v2.10.0 (Mon May 09 2022)

### Release Notes

#### chore: local development via http ([#76](https://github.com/gr4vy/gr4vy-embed/pull/76))

Updates handling of `iframeHost` and `apiHost` so that both use `https` by default. If you wish to use `http` instead you should pass a new prop `secure={false}` to embed.

---

#### 🚀 Enhancement

- chore: local development via http [#76](https://github.com/gr4vy/gr4vy-embed/pull/76) ([@gryevns](https://github.com/gryevns))

#### Authors: 1

- Gary Evans ([@gryevns](https://github.com/gryevns))

---

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
