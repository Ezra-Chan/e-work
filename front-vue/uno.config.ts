import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
} from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  rules: [
    [
      /^border-rdp-(\d+\.{0,1}\d{0,2})$/,
      ([, d]) => ({ 'border-radius': `${d}%` }),
    ],
    [/^fs-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ 'font-size': `${d}rem` })],
    [
      /^w-calc-(\d+\.{0,1}\d{0,2})$/,
      ([, d]) => ({ width: `calc(100% - ${d}rem)` }),
    ],
    [
      /^h-calc-(\d+\.{0,1}\d{0,2})$/,
      ([, d]) => ({ height: `calc(100% - ${d}rem)` }),
    ],
  ],
});
