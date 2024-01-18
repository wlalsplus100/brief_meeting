export default {
  extends: ['next', 'next/core-web-vitals', 'airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'arrow-parens': ['error', 'as-needed'],
  },
};
