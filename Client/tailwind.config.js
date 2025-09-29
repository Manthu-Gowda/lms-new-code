/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-soft': 'hsla(26,92%,91%,.4)',
        'bg-base': 'rgb(243,243,243)',
        'accent': 'rgb(247,126,35)',
        'modern-black': '#000000',
        'modern-white': '#FFFFFF',
      },
      backgroundImage: {
        'grad-wash': 'linear-gradient(180deg, #ffa347 25%, hsla(0,0%,100%,.6) 80.76%)',
      },
      borderRadius: {
        'modern': '16px',
        'pill': '9999px',
      },
      boxShadow: {
        'modern-sm': '0 2px 8px rgba(0,0,0,.06)',
        'modern-md': '0 6px 20px rgba(0,0,0,.08)',
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["dark"],
  },
} 