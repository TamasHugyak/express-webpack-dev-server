
import { Server }      from 'http';
import { Application } from 'express';

declare namespace w {
  class ExpressWebpackDevServer {
    constructor(
      httpServer        : Server,
      expressApp        : Application,
      webpackConfig     : {[key: string]: any},
      middlewareOptions : {[key: string]: any},
      hotClientOptions  : {[key: string]: any}
    );

    new (
      httpServer        : Server,
      expressApp        : Application,
      webpackConfig     : {[key: string]: any},
      middlewareOptions : {[key: string]: any},
      hotClientOptions  : {[key: string]: any}
    ) : void;
  }
}

export = w;
