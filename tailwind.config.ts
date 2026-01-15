import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: 'class',
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                apple: {
                    blue: {
                        light: '#007AFF',
                        dark: '#0A84FF',
                    },
                    green: {
                        light: '#34C759',
                        dark: '#30D158',
                    },
                    red: {
                        light: '#FF3B30',
                        dark: '#FF453A',
                    },
                    orange: {
                        light: '#FF9500',
                        dark: '#FF9F0A',
                    },
                    gray: {
                        100: '#F2F2F7',
                        200: '#E5E5EA',
                        300: '#D1D1D6',
                        400: '#C7C7CC',
                        500: '#AEAEB2',
                        600: '#8E8E93',
                    },
                    background: {
                        light: '#FFFFFF',
                        dark: '#000000',
                        elevated: '#1C1C1E',
                    },
                    label: {
                        primary: {
                            light: '#000000',
                            dark: '#FFFFFF',
                        },
                        secondary: {
                            light: '#3C3C43',
                            dark: '#EBEBF5',
                        },
                    },
                    separator: {
                        light: '#C6C6C8',
                        dark: '#38383A',
                    }
                },
            },
            borderRadius: {
                'apple': '20px',
            },
            fontFamily: {
                sans: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
            },
            backdropBlur: {
                'apple': '20px',
            },
        },
    },
    plugins: [],
};

export default config;
