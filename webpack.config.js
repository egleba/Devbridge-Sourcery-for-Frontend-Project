const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Route = require('./config/routes');

const Routes = Object.values(Route);
const getFileNameAfterProcessing = filePath => filePath.split('/').pop().replace(/\.hbs/, '');

module.exports = {
  entry: [
    './src/js/index.js',
    './src/styles/index.scss',
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '.dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
      },
      {
        test: /\.hbs$/,
        loader: require.resolve('handlebars-loader'),
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
                limit: 8000,
                name: 'assets/[hash]-[name].[ext]'
            }
        }]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'main.css',
            }
          },
          require.resolve('extract-loader'),
          require.resolve('css-loader'),
          require.resolve('postcss-loader'),
          require.resolve('sass-loader'),
        ],
      }
    ]
  },
  plugins: [
    ...Routes.map(({ title, file, titleFb, description, url }) => new HtmlWebpackPlugin({
      template: file,
      title,
      titleFb,
      description,
      url,
      filename: getFileNameAfterProcessing(file),
      templateParameters: require('./config/data.json')
    })),
    new HtmlWebpackTagsPlugin({ tags: ['main.css'], append: true }),
    new CopyWebpackPlugin([
      { from: 'src/assets', to: 'assets' },
    ]
    ),
  ],
  devServer: {
    contentBase: path.join(__dirname, '.dist'),
    compress: true,
    port: 9000,
    open: true,
    historyApiFallback: {
      rewrites: Routes.filter(r => r.url !== '/').map(({ url, file }) => ({
        from: url,
        to: `/${getFileNameAfterProcessing(file)}`,
      })),
    }
  }
};
