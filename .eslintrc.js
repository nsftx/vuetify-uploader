module.exports = {
  root: true,
  extends: [
    '@vue/airbnb',
    'plugin:vue/recommended',
  ],
  plugins: [
    'vuetify',
    'vue',
  ],
  rules: {
    'vuetify/no-deprecated-classes': 'error',
    'vuetify/grid-unknown-attributes': 'error',
    'vuetify/no-legacy-grid': 'error',
    'vue/max-attributes-per-line': ['error', {
      multiline: {
        allowFirstLine: true,
      },
    }],
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'never',
    }],
  },
};
