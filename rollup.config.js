import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import polyfills from 'rollup-plugin-node-polyfills'
import sass from 'rollup-plugin-sass'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import replace from '@rollup/plugin-replace'


const dir = process.env.BUILD
const plugins = [
  replace({
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    preventAssignment: true
  }),
  nodeResolve({
    browser: true,
    preferBuiltins: false, // bu ayar, yerleşik modüllerin kullanımını engeller.
  }),
  commonjs(),
  polyfills(),
  typescript({
    tsconfig: './tsconfig.json'
  }),
  sass({
    // sass dosyasının yolu
    input: './assets/app.scss',
    // css dosyasının çıktı yolu
    output: `./${dir}/index.css`,
    options: {
      outputStyle: 'compressed'
    }
  })
]

if (dir === 'public') {
  plugins.push(
    serve({
      contentBase: [dir],
      port: 5900,
      open: true,
    }),
    livereload({
      watch: dir,
      port: 5901
    }))
}

export default {
  input: './index.ts',
  output: {
    name: 'Thinker',
    file: `./${dir}/index.js`,
    format: 'umd',
    sourcemap: true,
  },
  plugins
}