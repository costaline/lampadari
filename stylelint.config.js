// prettier-ignore
/* eslint-disable */
module.exports = {
  extends: ["stylelint-config-recommended", "stylelint-config-rational-order"],

  defaultSeverity: "warning",

  plugins: ["stylelint-scss"],

  rules: {
    "max-empty-lines": 1,
    "color-hex-case": "lower",
    "block-closing-brace-empty-line-before": "never",
    "block-opening-brace-space-before": "always",
    "declaration-block-no-duplicate-properties": true,

    "at-rule-no-unknown": [ true, { ignoreAtRules: [
      "if", "each", "include", "mixin", "else", "for", "function", "return",
    ]}],

    "at-rule-empty-line-before": [ "always", {
      except: ["blockless-after-same-name-blockless", "first-nested"],
      ignoreAtRules: ["else", "include"],
    }],

    "rule-empty-line-before": [ "always", { except: [
      "after-single-line-comment", "first-nested"
    ]}],

    "order/properties-order": [],
    "plugin/rational-order": [true, { "empty-line-between-groups": false }],
  },
};
