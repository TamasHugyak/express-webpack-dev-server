
import { Server }		from 'http';
import { Application }	from 'express';

declare namespace w {
	class ExpressWebpackDevServer {
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
}

export = w;
