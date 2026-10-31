/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: '#060709',
          900: '#0c0e12',
          850: '#11141a',
          800: '#171c24',
          700: '#232a36',
          600: '#343e4f',
          500: '#4e5b70',
        },
        neonRed: {
          DEFAULT: '#ff1a40',
          glow: '#ff3355',
          dark: '#b30926',
          subtle: 'rgba(255, 26, 64, 0.15)',
        },
        electricAmber: {
          DEFAULT: '#ff8c00',
          light: '#ffa500',
          glow: '#ff9d26',
          subtle: 'rgba(255, 140, 0, 0.15)',
        },
        radarCyan: {
          DEFAULT: '#00f0ff',
          glow: '#33f4ff',
          subtle: 'rgba(0, 240, 255, 0.15)',
        },
        techEmerald: {
          DEFAULT: '#00e676',
          glow: '#33eb91',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'Menlo', 'monospace'],
        display: ['Space Grotesk', 'Orbitron', 'Inter', 'sans-serif'],
      },
      animation: {
        'radar-sweep': 'radarSweep 4s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'glow-red': 'glowRed 1.5s ease-in-out infinite alternate',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        glowRed: {
          '0%': { boxShadow: '0 0 15px rgba(255, 26, 64, 0.3)' },
          '100%': { boxShadow: '0 0 35px rgba(255, 26, 64, 0.85)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
        'radial-vignette': "radial-gradient(circle at center, transparent 30%, #060709 100%)",
      }
    },
  },
  plugins: [],
}
