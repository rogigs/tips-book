module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'airbnb',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "react/forbid-prop-types": "off",
    "import/prefer-default-export": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off", // should be exluded
  },
};
