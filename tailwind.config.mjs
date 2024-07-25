/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				comfortaa: ['Comfortaa Variable', 'Onest Variable'],
				merienda: ['Merienda Variable', 'Onest Variable'],
			},
			colors: {
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)',
				highlighted: 'var(--color-highlighted)',
				accent: 'var(--color-accent)',
			},
		},
	},
	plugins: [],
}
