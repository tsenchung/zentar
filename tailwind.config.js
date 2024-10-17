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
					primary: '#04547C',
					'primary-content': '#eee',
					secondary: '#B679FC',
					error: 'oklch(51.32% 0.269 22.18)'
				}
			}
		]
	},
	plugins: [tailwindTypography, daisyui]
};
