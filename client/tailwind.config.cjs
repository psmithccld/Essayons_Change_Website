module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Exact sampled palette (from your uploaded logo image)
        'essayons-primary': '#9b1e24',      // primary red (logo circle)
        'essayons-primary-700': '#6e1519',  // darker red
        'essayons-text': '#243236',         // dark teal/charcoal for text
        'essayons-muted': '#d7d5c7',        // muted beige background
        'essayons-accent': '#314d4d'        // muted teal accent
      },
      container: {
        center: true,
        padding: '1rem'
      }
    }
  },
  plugins: []
};
