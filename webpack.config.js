const path                    = require( 'path' )
const webpack                 = require( 'webpack' )
const WebpackBar              = require( 'webpackbar' )
const HtmlWebpackPlugin       = require( 'html-webpack-plugin' )
const MiniCssExtractPlugin    = require( 'mini-css-extract-plugin' )
const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' )
const TerserPlugin            = require( 'terser-webpack-plugin' )
const { CleanWebpackPlugin }  = require( 'clean-webpack-plugin' )
const CopyWebpackPlugin       = require( 'copy-webpack-plugin' )

const PATHS = {
	src:    path.join( __dirname, 'src' ),
	dist:   path.join( __dirname, 'dist' ),
	assets: 'assets/'
}

module.exports = {
	externals:    {
		paths: PATHS
	},
	entry:        {
		index:    `${ PATHS.src }/index.js`,
		snippets: `${ PATHS.src }/snippets.js`
	},
	output:       {
//    filename: `${PATHS.assets}js/[name].[hash].js`,
		filename:   `${ PATHS.assets }js/[name].js`,
		path:       `${ PATHS.dist }`,
		publicPath: '/'
	},
	devtool:      'cheap-module-eval-source-map',
	devServer:    {
		contentBase: PATHS.dist,
		compress:    true,
		port:        4200,
		overlay:     {
			warnings: true,
			errors:   true
		}
	},
	optimization: {
		minimizer:   [
			new TerserPlugin({}),
			new OptimizeCssAssetsPlugin( {} )
		],
		splitChunks: {
			cacheGroups: {
				vendor: {
					name:    'vendors',
					test:    /node_modules/,
//					chunks:  'all',
					enforce: true
				}
			}
		}
	},
	plugins:      [
		new CleanWebpackPlugin(),
		new WebpackBar(),
		new HtmlWebpackPlugin( {
			hash:         false,
			title:        'my index page!',
			myPageHeader: 'Hello INDEX',
			chunks:       [ 'vendor', 'index' ],
			template:     `${ PATHS.src }/index.html`,
			filename:     'index.html'
		} ),
		new HtmlWebpackPlugin( {
			hash:         false,
			title:        'my snippets page!',
			myPageHeader: 'Hello Snippets',
			template:     `${ PATHS.src }/snippets.html`,
			chunks:       [ 'vendor', 'snippets' ],
			filename:     'snippets.html', //relative to root of the application
			inject:       true
		} ),
		new MiniCssExtractPlugin( {
			filename: `${ PATHS.assets }css/[name].[hash].css`
		} ),
		new CopyWebpackPlugin( [
			{
				from: `${ PATHS.src }/assets/img/`,
				to:   `${ PATHS.dist }/assets/img/[name].[ext]`
			},
			{
				from: `${PATHS.src}/static`,
				to: ``
			}
		] ),
		//для полного билда закоментировать нижний плагин
		new webpack.SourceMapDevToolPlugin( {
			filename: '[file].map'
		} )
	],
	resolve: {
		extensions: ['.js', '.ts']
	},
	module:       {
		rules: [
			{
				test: /\.css$/i,
				//				use:  [ 'style-loader', 'css-loader' ]
				use:  [
					MiniCssExtractPlugin.loader,
					{
						loader:  'css-loader',
						options: {}
					}
				]
			},
			{
				test: /\.scss$/,
				use:  [
					process.env.NODE_ENV !== 'production'
					? 'style-loader'
					: MiniCssExtractPlugin.loader,
					{
						loader:  'css-loader',
						options: {
							sourceMap: true
						}
					},
//					{
//						loader:  'postcss-loader',
//						options: {
//							sourceMap: true,
//							config:    { path: `./postcss.config.js` }
//						}
//					},
					{
						loader:  'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.less$/,
				use:  [
					//выключил потому что перебивает все sourcemap
					//					process.env.NODE_ENV !== 'production'
					//					? 'style-loader'
					//					:
					MiniCssExtractPlugin.loader,
					{
						loader:  'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader:  'less-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use:  [
					{
						loader:  'file-loader',
						options: {
							name:            '[name].[ext]',
							outputPath:      `${ PATHS.assets }img`,
							useRelativePath: true
						}
					},
					{
						loader:  'image-webpack-loader',
						options: {
							mozjpeg:  {
								progressive: true,
								quality:     65
							},
							// optipng.enabled: false will disable optipng
							optipng:  {
								enabled: false
							},
							pngquant: {
								quality: '65-90',
								speed:   4
							},
							gifsicle: {
								interlaced: false
							},
							// the webp option will enable WEBP
							webp:     {
								quality: 75
							}
						}
					}
				]
			},
			{
				test:    /\.js$/,
				exclude: /node_modules/,
				loader:  'babel-loader'
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use:  [
					{
						loader:  'file-loader',
						options: {
							name:       '[name].[ext]',
							outputPath: `${ PATHS.assets }fonts`
						}
					}
				]
			}
		]
	}
}
