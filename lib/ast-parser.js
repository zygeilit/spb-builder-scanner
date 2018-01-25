"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEachProperty = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {};
var forEachProperty = /*#__PURE__*/exports.forEachProperty = _regenerator2.default.mark(function _callee(node) {
  var prop;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = _regenerator2.default.keys(node);

        case 1:
          if ((_context.t1 = _context.t0()).done) {
            _context.next = 8;
            break;
          }

          prop = _context.t1.value;

          if (!this._ignoredProperties.has(prop)) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("continue", 1);

        case 5:
          return _context.abrupt("return", {
            value: node[prop],
            key: prop,
            computed: false
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
});