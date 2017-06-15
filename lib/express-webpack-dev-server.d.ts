
/**
 * @utf8 ő
 */

declare module "express-webpack-dev-server" {
	import { Server }		from "http";
	import { Application }	from "express";

	class ExpressWebpackDevServer {
		constructor(
			httpServer			: Server,
			expressApp			: Application,
			webpackConfig		: object,
			middlewareOptions	: object
		);
	}
	export {
		ExpressWebpackDevServer
	};
}
