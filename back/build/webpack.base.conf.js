const path                 = require( 'path' )
const WebpackBar           = require( 'webpackbar' )
const webpack              = require( 'webpack' )
const HTMLPlugin           = require( 'html-webpack-plugin' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )
const htmlLoader           = require( 'html-loader' )

const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' )
const CopyWebpackPlugin      = require( 'copy-webpack-plugin' )

console.info( 'process.env.NODE_ENV: >>>>======>>>>>> ', process.env.NODE_ENV )
const PATHS = {
	src:    path.join( __dirname, '..', 'src' ),
	dist:   path.join( __dirname, '..', 'dist' ),
	assets: 'assets/'
}
//console.log('>>>>>>>>', path.join( __dirname, '..', 'dist' ) )
//console.log('>>>>>>>>', `${ PATHS.dist }/assets/css/[name].css` )

module.exports = {
	entry:   PATHS.src,
	output:  {
		path:              PATHS.dist,
		filename:          `${ PATHS.assets }js/[name].js`,
		sourceMapFilename: '[name].js.map',
		publicPath:        '/'
	},
	plugins: [
		new CleanWebpackPlugin(),
		new WebpackBar(),
		new HTMLPlugin( {
			template: `${ PATHS.src }/index.html`,
			filename: 'snippets.html'
			
			//отключаем вставку в файл
//			inject: false
		} ),
		new MiniCssExtractPlugin( {
			filename: 'bundle.css'
//			filename: `/assets/css/[name].css`
		} ),
		//	для полного билда закоментировать нижний плагин
		new webpack.SourceMapDevToolPlugin( {
			filename: '[file].map'
		} ),
		new CopyWebpackPlugin( [
			{
				from: `${ PATHS.src }/assets/img/`,
				to:   `${ PATHS.dist }/assets/img/[name].[ext]`
			}
		] )
	],
	resolve: {
		extensions: [ '.js', '.ts' ]
	},
	module:  {
		rules: [
			{
				test: /\.css$/,
				use:  [
					process.env.NODE_ENV !== 'production'
					?
					'style-loader'
					:
					MiniCssExtractPlugin.loader,
					{
						loader:  'css-loader',
						options: { sourceMap: true }
					}
				]
			},
			{
				test: /\.(sa|sc)ss$/,
				use:  [
					process.env.NODE_ENV !== 'production'
					?
					'style-loader'
					:
					MiniCssExtractPlugin.loader,
					{
						loader:  'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader:  'postcss-loader',
						options: {
							sourceMap: true,
							config:    { path: `./postcss.config.js` }
						}
					},
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
					process.env.NODE_ENV !== 'production'
					?
					'style-loader'
					:
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
				test:    /\.(js|ts)$/,
				exclude: /node_modules/,
				loader:  'babel-loader'
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
     //TODO: при dev сборке не показывается css файл и нет  sourcemap
