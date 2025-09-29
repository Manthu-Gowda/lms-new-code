import postcssImport from 'postcss-import';
import tailwindcssNesting from 'tailwindcss/nesting/index.js'; // Explicitly import index.js
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    postcssImport,
    tailwindcssNesting,
    tailwindcss,
    autoprefixer,
  ],
};