const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    },
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
      hot: true,
      https: true,
      proxy: {
        '/api': {
          secure: false,
          changeOrigin: true
          // pathRewrite: {
          //     '^/api': ''
          // }
        }
      }
    }
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, './src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      });
    const fileRule = config.module.rule('file');
    fileRule.uses.clear();
    fileRule
      .test(/\.svg$/)
      .exclude.add(path.resolve(__dirname, './src/icons'))
      .end()
      .use('file-loader')
      .loader('file-loader');
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@components', resolve('src/components'));
  }
};
