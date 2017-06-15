
/**
 * @utf8 ő
 */

declare module "express-webpack-dev-server" {
	import { Server }		from "http";
	import { Application }	from "express";

	function ExpressWebpackDevServer(
		httpServer			: Server,
		expressApp			: Application,
		webpackConfig		: object,
		middlewareOptions	: object
	) : void;

	namespace ExpressWebpackDevServer {}
}
