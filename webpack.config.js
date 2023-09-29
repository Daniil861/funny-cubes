const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || 'development';

const devMode = mode === 'development'; // проверяем в каком режиме мы находимся, разработки или продакшн

const target = devMode ? 'web' : 'browserslist'; // определяем для каких браузеров производим сборку и используем соответствующие автопрефиксы
const devtool = devMode ? 'source-map' : undefined;


module.exports = {
	mode,
	target,
	devtool,
	devServer: { // в настройках сервера можем указать на каком порте запускаться и прочие
		open: true, // при команде запуска открываем окно браузера
		port: 'auto', // порт выбираем автоматически (выбирает 192.168...)
		hot: true, // оптимизирует перезагрузку - при изменениях на странице не перезагружает страницу, но вносит изменения
		host: 'local-ip', // разрешаем запуск в локальной сети
	},
	entry: [path.resolve(__dirname, 'src', 'index.js')],
	output: { //  в данный объект помещаем информацию о папке в которую вебпак будет формировать результат
		path: path.resolve(__dirname, 'dist'), // указываем путь и название папки с результатом
		clean: true, // означает что каждый раз очищаем папку
		filename: 'index.[contenthash].js', // имя файла, в который вебпак конвертирует результат. Указываем чтобы при каждой перезаписи - к имени добавлялся новый хэш, для исключения кэширования браузером(если не использовать что-то подобное, браузер возмет файл из кэша, не станет скачивать обновленный)
		assetModuleFilename: 'asset/[name][ext]' // создается отдельная папка для ассетов. Они автоматически туда сохраняются, дополнительно ничего не прописываем
	},
	plugins: [
		new HtmlWebpackPlugin({ // с помощью данного плагина переносим файл index.html в прод дерикторию
			template: path.resolve(__dirname, 'src', 'index.html')
		}),
		new MiniCssExtractPlugin({
			filename: 'style.[contenthash].css'
		})
	],
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.(c|sc)ss$/i,
				use: [
					devMode ? "style-loader" : MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: ["postcss-preset-env"],
							},
						},
					},
					"sass-loader"
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: { // для того чтобы в билд сохранял не в общую директорию а создавал папку fonts - используем генератор
					filename: 'fonts/[name][ext]'
				}
			},
			{
				test: /\.(jpe?g|png|webp|gif|svg)$/i,
				use: [
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
							},
							// optipng.enabled: false will disable optipng
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: [0.65, 0.90],
								speed: 4
							},
							gifsicle: {
								interlaced: false,
							},
							// the webp option will enable WEBP
							webp: {
								quality: 75
							}
						},
					},
				],
				type: 'asset/resource',
				generator: { // для того чтобы в билд сохранял не в общую директорию а создавал папку fonts - используем генератор
					filename: 'image/[name][ext]'
				}
			},
			{
				test: /\.(mp3|wav|ogg)$/i,
				include: path.resolve(__dirname, "src/assets/audio"),
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "audio/",
						},
					},
				],
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	}
}