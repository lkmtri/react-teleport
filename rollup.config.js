const babel = require('rollup-plugin-babel')

module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/react-teleport.js',
      format: 'cjs',
    },
    {
      file: 'dist/react-teleport.esm.js',
      format: 'esm',
    },
  ],
  plugins: [
    babel({
      babelrc: true,
    }),
  ],
}
