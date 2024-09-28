import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off', // 사용되지 않는 변수 규칙 비활성화
      'react-hooks/exhaustive-deps': 'off', // useEffect 의존성 규칙 비활성화
    },
  },
];
