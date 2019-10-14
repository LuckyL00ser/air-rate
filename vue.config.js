
module.exports = {
  productionSourceMap: false,
  chainWebpack: (config) => {
    // https://github.com/vuejs/vue-cli/issues/2381#issuecomment-425038367
    const IS_VENDOR = /[\\/]node_modules[\\/]/;
    config.optimization.splitChunks({
      cacheGroups: {
        index: {
          name: 'chunk-index-vendors',
          priority: -11,
          chunks: chunk => chunk.name === 'index',
          test: IS_VENDOR,
          enforce: true,
        },
        slug: {
          name: 'chunk-slug-vendors',
          priority: -11,
          chunks: chunk => chunk.name === 'slug',
          test: IS_VENDOR,
          enforce: true,
        },
        common: {
          name: 'chunk-common',
          priority: -20,
          chunks: 'initial',
          minChunks: 2,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    });
  },
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-index-vendors', 'chunk-common', 'index'],
    },
    slug: {
      // entry for the page
      entry: 'src/pages/slug/slug.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'slug.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Slug Page',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-slug-vendors', 'chunk-common', 'slug'],
    },
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /\/index/, to: '/index.html' },
        { from: /\/slug/, to: '/slug.html' },
      ],
    },
  },
};
