/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Blue palette for buying/renting (trust, reliability)
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Polished blue variant (from your ChatGPT reference)
        'polished-blue': {
          50: '#f0f8ff',
          100: '#e0f1ff',
          200: '#b8e2ff',
          300: '#7cc8ff',
          400: '#4a90e2',
          500: '#0052cc',
          600: '#0047b3',
          700: '#003d99',
          800: '#003380',
          900: '#002966',
        },
        // Green palette for selling/letting (growth, prosperity)
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Soft green variant (from your ChatGPT reference)
        'soft-green': {
          50: '#f4fdf6',
          100: '#e8fbec',
          200: '#d1f7d8',
          300: '#a3d9a5',
          400: '#7cc481',
          500: '#28a745',
          600: '#22963d',
          700: '#1e8535',
          800: '#1a742d',
          900: '#166325',
        },
        // Navy/Dark Slate for premium elements
        navy: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 