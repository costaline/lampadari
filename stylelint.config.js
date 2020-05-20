module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-rational-order'],

  defaultSeverity: 'warning',

  plugins: [],

  rules: {
    'max-empty-lines': 1,
    'color-hex-case': 'lower',
    'block-closing-brace-empty-line-before': 'never',

    'order/properties-order': [],
    'plugin/rational-order': [true, { 'empty-line-between-groups': false }],
  },
};
