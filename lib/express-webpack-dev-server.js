
/**
 * @utf8 ő
 */

const createReadStream        = require('fs').createReadStream;
const join                    = require('path').join;
const defWebpack              = require('webpack');
const defWebpackDevMiddleware = require('webpack-dev-middleware');
const defWebpackHotClient     = require('./hot-server/index');

class ExpressWebpackDevServer {

  constructor(httpServer, expressApp, webpackConfig, middlewareOptions, hotClientOptions) {
    this._app = expressApp;
    this._webpackCompiler = defWebpack(webpackConfig);

    if (!middlewareOptions) middlewareOptions = {};
    if (!hotClientOptions) hotClientOptions = {};

    this._addRoutes();
    this._attachHotClient(hotClientOptions);
    this._useMiddleware(middlewareOptions);
  }

  _attachHotClient(options) {
    defWebpackHotClient(this._webpackCompiler, options);
  }

  _useMiddleware(middlewareOptions) {
    this._app.use(defWebpackDevMiddleware(
      this._webpackCompiler,
      middlewareOptions
    ));
  }

  _addRoutes() {
    this._app.get('/webpack-live-reload.svg', (req, res) => {
      res.setHeader('Content-Type', 'image/svg+xml');
      res.setHeader('Vary', 'Accept-Encoding');
      createReadStream(
        join(__dirname, '..', 'static', 'icon', 'webpack.svg')
      ).pipe(res);
    });
  }
}

module.exports = {
  ExpressWebpackDevServer
};
