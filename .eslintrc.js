module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": ["jest"],
  "env": {
    "browser": true,
    "jest/globals": true,
    "node": true
  },
  "rules": {
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "quotes": ["error", "backtick"],
    "semi": ["error", "never"]
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}