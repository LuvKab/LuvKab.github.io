import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        garden: {
          bg: '#F7F3EA',
          paper: '#FFFDF7',
          ink: '#1F1F1D',
          body: '#3F3B34',
          muted: '#6F6A60',
          line: '#E2D8C7',
          tag: '#F2EBDD',
          green: '#4F7C64',
          blue: '#445F7C',
          rust: '#8A5A44',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        soft: '0 18px 50px rgba(48, 38, 25, 0.08)',
      },
    },
  },
  plugins: [],
}

export default config
