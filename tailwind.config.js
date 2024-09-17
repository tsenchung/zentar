/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
import tailwindTypography from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				light: {
					primary: '#99dbff'
				}
			}
		]
	},
	plugins: [tailwindTypography, daisyui]
};
