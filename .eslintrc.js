module.exports = {
  root: true,
  extends: [
    'plugin:vue/recommended',
  ],
  plugins: [
    'vue',
    'jest',
    'vuetify',
  ],
  rules: {
    'vuetify/no-deprecated-classes': 'error',
    'vuetify/grid-unknown-attributes': 'error',
    'vuetify/no-legacy-grid': 'error',
  },
};