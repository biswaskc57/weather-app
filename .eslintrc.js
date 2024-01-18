module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'prettier'
	],
	'overrides': [
		{
			'env': {
				'node': true
			},
			'files': [
				'.eslintrc.{js,cjs}'
			],
			'parserOptions': {
				'sourceType': 'script'
			}
		}
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'@typescript-eslint',
		'react',
		'react-hooks'
	],
	'rules': {
		'no-shadow': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'import/prefer-default-export': 'off',
		'@typescript-eslint/no-shadow': ['error'],
		'no-use-before-define': 'off',
		'react/prop-types': 'off',
		'@typescript-eslint/no-use-before-define': ['error'],
		'react/jsx-filename-extension': [ 'warn', {'extensions': ['.tsx']} ],
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		
	},
	'settings': {
		'import/resolver': {
			'typescript': {}
		}
	}
};
