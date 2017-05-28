
/**
 * @utf8 ő
 */

const SockJS = require('sockjs');

class SocketServer {
	constructor(httpServer) {
		this.sockets = [];
		this._stats = null;

		this.initSockServer(httpServer);
		this.closeServer();
	}

	initSockServer(httpServer) {
		const sockServer = SockJS.createServer({
			// Use provided up-to-date sockjs-client
			sockjs_url: '/__webpack_dev_server__/sockjs.bundle.js',
			log: (severity, line) => {
				if (severity === 'error') {
					console.log(line);
				}
			}
		});

		sockServer.on('connection', (conn) => {
			if (!conn) {
				return;
			}

			this.sockets.push(conn);

			conn.on('close', () => {
				const connIndex = this.sockets.indexOf(conn);
				if (connIndex > -1) {
					this.sockets.splice(connIndex, 1);
				}
			});

			if (!this._stats) {
				return;
			}

			this.sendStats([conn], this._stats.toJson(this._stats), true);
		});

		sockServer.installHandlers(httpServer, {
			prefix: '/sockjs-node'
		});
	}

	sendStats(sockets, stats, force) {
		if (
			!force
			&& stats
			&& (!stats.errors || stats.errors.length === 0)
			&& stats.assets
			&& stats.assets.every((asset) => !asset.emitted)
		) {
			return this.sockWrite(sockets, 'still-ok');
		}

		this.sockWrite(sockets, 'hash', stats.hash);

		if (stats.errors.length > 0) {
			this.sockWrite(sockets, 'errors', stats.errors);
		} else if (stats.warnings.length > 0) {
			this.sockWrite(sockets, 'warnings', stats.warnings);
		} else {
			this.sockWrite(sockets, 'ok');
		}
	}

	sockWrite(sockets, type, data) {
		sockets.forEach((socket) => {
			socket.write(JSON.stringify({
				type: type,
				data: data
			}));
		});
	}

	setStats(stats) {
		this._stats = stats;
	}

	closeServer() {
		['SIGINT', 'SIGTERM'].forEach((sig) => {
			process.on(sig, () => {
				this.sockets.forEach((sock) => {
					sock.close();
				});
				this.sockets = [];
			});
		});
	}
}

module.exports = SocketServer;
