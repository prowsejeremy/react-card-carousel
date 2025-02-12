module.exports = {
  extends: [
    "react-app",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  ignorePatterns: ["src/__CardCarousel/*"],
  rules: {
    "react/react-in-jsx-scope": "off",
  },
};
