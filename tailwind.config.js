export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        safe: '#10b981',      // Green
        risky: '#f59e0b',     // Amber
        danger: '#ef4444',    // Red
      }
    },
  },
  plugins: [],
}
