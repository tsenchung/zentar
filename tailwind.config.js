/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
import tailwindTypography from '@tailwindcss/typography';
import themes from 'daisyui/src/theming/themes';
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				light: {
					...themes['light'],
					primary: '#99dbff',
					secondary: '#ee99ff',
					error: 'oklch(51.32% 0.269 22.18)',
				}
			}
		]
	},
	plugins: [tailwindTypography, daisyui]
};
