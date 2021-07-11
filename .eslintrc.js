module.exports = {
  "prettier/prettier": [
    "error",
    {
      "endOfLine": "auto"
    },
  ],
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
};
