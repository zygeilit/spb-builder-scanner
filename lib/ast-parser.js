"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  forEachProperty: /*#__PURE__*/_regenerator2.default.mark(function forEachProperty(node) {
    var prop;
    return _regenerator2.default.wrap(function forEachProperty$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = _regenerator2.default.keys(node);

          case 1:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 9;
              break;
            }

            prop = _context.t1.value;

            if (!this._ignoredProperties.has(prop)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("continue", 1);

          case 5:
            _context.next = 7;
            return {
              value: node[prop],
              key: prop,
              computed: false
            };

          case 7:
            _context.next = 1;
            break;

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, forEachProperty, this);
  })
};
module.exports = exports['default'];