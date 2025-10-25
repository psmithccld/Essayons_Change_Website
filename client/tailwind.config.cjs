module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Sampled from the provided logo (image1). Adjust if you want further tuning.
        'essayons-primary': '#9a1f26',   // deep logo red
        'essayons-primary-700': '#7a181d',
        'essayons-text': '#243238',      // teal/charcoal text
        'essayons-muted': '#d8d6c8',     // beige background
        'essayons-accent': '#3d5b5b'     // muted teal accent
      },
      container: {
        center: true,
        padding: '1rem'
      }
    }
  },
  plugins: []
};