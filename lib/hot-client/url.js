'use strict';

module.exports = {
  format: (options) => {
    return options.protocol + '://' + options.hostname + ':' + options.port;
  },
  getUrl: () => {
    const protocol = window.location.protocol;
    const host = window.location.hostname;
    const port = window.location.port === '' ? '' : ':' + window.location.port;
    return protocol + '//' + host + port;
  }
};
