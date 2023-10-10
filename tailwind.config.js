/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	important: "#root",
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				"primary-color": "var(--primary-color)",
				"secondary-color": "var(--secondary-color)",
				"ternary-color": "var(--ternary-color)",
				"effect-color": "var(--effect-color)",
				"common-color": "var( --common-color)",
				"gray-color": "var(  --gray-color)",
				"action-color": "var(--action-color)",
				"dashboard-color": "var(--dashboard-color)",
				"dark-primary-colro": "var(--dark-primary-color)",
				"dark-secondary-colro": "var(--dark-secondary-color)",
				"dark-common-color": "var(--dark-common-color)",
				"dark-dashboard-color": "var(--dark-dashboard-color)",
				"dark-gray-color": "var(--dark-gray-color)",
			},
			animation: {
				"bounce-custom": "bounce 2s", // Use your custom keyframes animation here
				
			},
		},
	},
	plugins: [],
};
