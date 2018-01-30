'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (node) {

  return {
    'type': 'closeMainContainer',

    'inputs': [{
      'name': 'width'
    }],

    'outputs': [{
      'name': 'containerWidth'
    }],

    'contextDepends': {
      'state': {
        'modifier': ['mainContainer', 'isClosed'],
        'getter': ['isClosed']
      },

      'this': {
        'getter': ['timer']
      }
    }
  };
};

module.exports = exports['default'];