import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        "surface-elevated": "hsl(var(--surface-elevated))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chat: {
          "user-bg": "hsl(var(--chat-user-bg))",
          "bot-bg": "hsl(var(--chat-bot-bg))",
          "input-bg": "hsl(var(--chat-input-bg))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-scale":
          "linear-gradient(50deg, hsl(var(--gradient-purple)), hsl(var(--gradient-blue)) 31.28%, hsl(var(--gradient-pink)) 77.97%, hsl(var(--gradient-yellow)) 95.64%)",
        "gradient-purple-blue":
          "linear-gradient(135deg, hsl(var(--gradient-purple)), hsl(var(--gradient-blue)))",
        "gradient-blue-pink":
          "linear-gradient(135deg, hsl(var(--gradient-blue)), hsl(var(--gradient-pink)))",
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
