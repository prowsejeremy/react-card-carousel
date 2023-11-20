import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import external from 'rollup-plugin-peer-deps-external';
import css from 'rollup-plugin-import-css';

export default {
  input: 'src/index.js',
  output: [
    { file: 'dist/index.js', format: 'cjs' },
    { file: 'dist/index.es.js', format: 'esm' }
  ],
  plugins: [
    external(),
    resolve({
      extensions: ['.js', '.jsx']
    }),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-react'],
      extensions: ['.js', '.jsx']
    }),
    css(),
    commonjs(),
    replace({
      preventAssignment: false
    })
  ],
  external: ["react"]
}