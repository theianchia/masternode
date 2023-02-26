/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: [
		'./node_modules/flowbite-react/**/*.js',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./public/**/*.html',
	],
	theme: {
		extend: {
			colors: {
				primary: {
					700: '#5B10FF',
					500: '#6400FF',
					300: '#F1E1FE',
					200: '#F2ECFF',
					DEFAULT: '#6400FF',
				},
				neutral: {
					100: '#f5f5f5',
					DEFAULT: '#f5f5f5',
				},
			},
		},
	},
	plugins: [require('flowbite/plugin')],
};
