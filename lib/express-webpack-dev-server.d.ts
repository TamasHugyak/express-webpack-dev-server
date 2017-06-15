
/**
 * @utf8 ő
 */

// export as namespace myClassLib;

export = ExpressWebpackDevServer;

import { Server }		from "http";
import { Application }	from "express";

declare class ExpressWebpackDevServer {
	constructor(
		httpServer			: Server,
		expressApp			: Application,
		webpackConfig		: object,
		middlewareOptions	: object
	);

	new (
		httpServer			: Server,
		expressApp			: Application,
		webpackConfig		: object,
		middlewareOptions	: object
	) : void;
}

declare namespace ExpressWebpackDevServer {}
