import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))", // azul claro
        input: "hsl(var(--input))", // azul claro
        ring: "hsl(var(--ring))", // azul principal
        background: "hsl(var(--background))", // azul muito claro
        foreground: "hsl(var(--foreground))", // azul principal
        surface: "hsl(var(--surface))", // azul muito claro
        "surface-elevated": "hsl(var(--surface-elevated))", // quase branco
        primary: {
          DEFAULT: "hsl(var(--primary))", // azul principal
          foreground: "hsl(var(--primary-foreground))", // branco
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // azul mais escuro
          foreground: "hsl(var(--secondary-foreground))", // branco
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))", // azul bem claro
          foreground: "hsl(var(--muted-foreground))", // azul acinzentado
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // azul principal
          foreground: "hsl(var(--accent-foreground))", // branco
        },
        popover: {
          DEFAULT: "hsl(var(--popover))", // azul muito claro
          foreground: "hsl(var(--popover-foreground))", // azul principal
        },
        card: {
          DEFAULT: "hsl(var(--card))", // branco
          foreground: "hsl(var(--card-foreground))", // azul principal
        },
        chat: {
          "user-bg": "hsl(var(--chat-user-bg))", // azul principal
          "bot-bg": "hsl(var(--chat-bot-bg))", // azul claro
          "input-bg": "hsl(var(--chat-input-bg))", // branco
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-scale":
          "linear-gradient(50deg, hsl(var(--gradient-purple)), hsl(var(--gradient-blue)) 31.28%, hsl(var(--gradient-pink)) 77.97%, hsl(var(--gradient-yellow)) 95.64%)", // tons de azul e branco
        "gradient-purple-blue":
          "linear-gradient(135deg, hsl(var(--gradient-purple)), hsl(var(--gradient-blue)))", // azul principal para azul médio
        "gradient-blue-white":
          "linear-gradient(135deg, hsl(var(--gradient-blue)), hsl(var(--gradient-white)))", // azul médio para branco
      },
      keyframes: {
        "message-slide-in": {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "typing-pulse": {
          "0%, 60%, 100%": {
            opacity: "0.4",
          },
          "30%": {
            opacity: "1",
          },
        },
        "fade-in-up": {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "message-slide-in": "message-slide-in 0.3s ease-out",
        "typing-pulse": "typing-pulse 1.5s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Arial", "sans-serif"],
        display: [
          "aeonik",
          "aeonik Fallback",
          "-apple-system",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
