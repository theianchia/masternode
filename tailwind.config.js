/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: [
		'./node_modules/flowbite-react/**/*.js',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./public/**/*.html',
	],
	theme: {
		extend: {},
	},
	plugins: [require('flowbite/plugin')],
};
