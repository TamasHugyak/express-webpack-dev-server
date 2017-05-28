
/**
 * @utf8 ő
 */

const createReadStream			= require('fs').createReadStream;
const join						= require('path').join;
const defWebpack				= require('webpack');
const defWebpackDevMiddleware	= require('webpack-dev-middleware');
const SocketServer				= require('./socket-server');

class ExpressWebpackDevServer {

	constructor(httpServer, expressApp, webpackConfig, middlewareOptions) {
		this._app = expressApp;
		this._webpackCompiler = defWebpack(webpackConfig());
		this._sockServer = new SocketServer(httpServer);
		this._clientStats = {
			errorDetails : false
		};

		if (!middlewareOptions) {
			middlewareOptions = {};
		}

		this._initMiddleware(middlewareOptions);
		this._addRoutes();
		this._attachEventsToCompiler();
	}

	_initMiddleware(middlewareOptions) {
		this._app.use(defWebpackDevMiddleware(
			this._webpackCompiler,
			middlewareOptions
		));
	}

	_addRoutes() {
		this._app.get('/webpack-dev-server.js', (req, res) => {
			res.setHeader('Content-Type', 'application/javascript');
			createReadStream(
				join(__dirname, '..', 'build', 'index.bundle.js')
			).pipe(res);
		});
	}

	_attachEventsToCompiler() {
		const invalidPlugin = () => {
			this._sockServer.sockWrite(this._sockServer.sockets, 'invalid');
		};
		this._webpackCompiler.plugin('compile', invalidPlugin);
		this._webpackCompiler.plugin('invalid', invalidPlugin);
		this._webpackCompiler.plugin('done', (stats) => {
			this._sockServer.sendStats(this._sockServer.sockets, stats.toJson(this._clientStats));
			this._sockServer.setStats(stats);
		});
	}
}

module.exports = (httpServer, expressApp, webpackConfig, middlewareOptions) => {
	return new ExpressWebpackDevServer(httpServer, expressApp, webpackConfig, middlewareOptions);
};
