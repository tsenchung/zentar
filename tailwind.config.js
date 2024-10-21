/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
import tailwindTypography from '@tailwindcss/typography';
import themes from 'daisyui/src/theming/themes';
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			aria: {
				invalid: 'invalid="true"'
			}
		}
	},
	daisyui: {
		themes: [
			{
				light: {
					...themes['light'],
					primary: 'oklch(44.42% 0.112 245.16)',
					'primary-content': '#eee',
					secondary: 'oklch(70.18% 0.1965 0)',
					error: 'oklch(51.32% 0.269 22.18)'
				}
			}
		]
	},
	plugins: [tailwindTypography, daisyui]
};
