import { defineConfig } from 'dumi';
import path from 'path';

const basePath = process.env.GH_PAGES ? '/tour/' : '/';
const publicPath = process.env.GH_PAGES ? '/tour/' : '/';

export default defineConfig({
  alias: {
    '@rc-component/tour$': path.resolve('src'),
    '@rc-component/tour/es': path.resolve('src'),
  },
  mfsu: false,
  favicons: ['https://avatars0.githubusercontent.com/u/9441414?s=200&v=4'],
  themeConfig: {
    name: 'Tour',
    logo: 'https://avatars0.githubusercontent.com/u/9441414?s=200&v=4',
  },
  outputPath: 'docs-dist',
  base: basePath,
  publicPath,
});
