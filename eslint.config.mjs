import globals from 'globals';
import pluginJs from '@eslint/js';
import jest  from 'eslint-plugin-jest';


export default [
  {
    files: ['**/*.jss'],
    languageOptions: {sourceType: 'commonjs'},
    ...jest.configs['flat/all']
  },
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  {ignores: ['coverage/', 'dist/']},
  pluginJs.configs.recommended,
];
