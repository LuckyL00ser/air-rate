module.exports = {
  productionSourceMap: false,
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
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
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
      chunks: ['chunk-vendors', 'chunk-common', 'slug'],
    },
  },
    devServer: {
        historyApiFallback: {
            rewrites: [
                { from: /\/index/, to: '/index.html' },
                { from: /\/slug/, to: '/slug.html' }
            ]
        }
    }
};
