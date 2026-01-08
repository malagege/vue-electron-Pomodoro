/* eslint-env node */
const {join} = require('path');
const {builtinModules} = require('module');
const {chrome} = require('../../electron-vendors.config.json');
const vue = require('@vitejs/plugin-vue');
const Icons = require('unplugin-icons/vite');

const vuePlugin = vue.default || vue;
const iconsPlugin = Icons.default || Icons;

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
module.exports = {
  mode: process.env.MODE,
  root: __dirname,
  resolve: {
    alias: {
      '/@/': join(__dirname, 'src') + '/',
    },
  },
  plugins: [vuePlugin(), iconsPlugin({ /* options */ })],
  base: '',
  server: {
    fs: {
      strict: true,
    },
  },
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: 'dist',
    assetsDir: '.',
    terserOptions: {
      ecma: 2020,
      compress: {
        passes: 2,
      },
      safari10: false,
    },
    rollupOptions: {
      external: [
        ...builtinModules,
      ],
    },
    emptyOutDir: true,
    brotliSize: false,
  },
};
