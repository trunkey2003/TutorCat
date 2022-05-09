"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _enUS = _interopRequireDefault(require("./entries/en-US"));

var _viVN = _interopRequireDefault(require("./entries/vi-VN"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AppLocale = {
  vi: _viVN["default"],
  en: _enUS["default"]
};
var _default = AppLocale;
exports["default"] = _default;