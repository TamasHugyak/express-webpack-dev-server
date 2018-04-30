'use strict';

const url = require('./url');

const slice = Array.prototype.slice;

const log = {
  level: '',
  logIcon: [
    '%c｢hot｣ ',
    'color: #999; padding: 0 0 0 20px; line-height: 16px;'
    + ` background: url('${url.getUrl()}/webpack-live-reload.svg') no-repeat;`
    + ' background-size: 16px 16px; background-position: 0 0;'
  ],
  _log: function (method, args) {
    const fn = console[method];
    fn.apply(fn, log.logIcon.concat(args));
  },
  debug: function () {
    if (['trace', 'debug'].indexOf(log.level) === -1) return;
    log._log('debug', slice.call(arguments));
  },
  info: function () {
    if (['trace', 'debug', 'info'].indexOf(log.level) === -1) return;
    log._log('info', slice.call(arguments));
  },
  warn: function () {
    if (['trace', 'debug', 'info', 'warn'].indexOf(log.level) === -1) return;
    log._log('warn', slice.call(arguments));
  },
  error: function () {
    if (['trace', 'debug', 'info', 'warn', 'error'].indexOf(log.level) === -1) return;
    log._log('error', slice.call(arguments));
  },
  log: function () {
    if (['trace', 'debug', 'info'].indexOf(log.level) === -1) return;
    log._log('log', slice.call(arguments));
  }
};

module.exports = log;
