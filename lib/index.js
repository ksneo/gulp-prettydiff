"use strict";
var prettydiff = require("prettydiff2");
var clone = require("lodash/clone");
var map = require("map-stream");
var PluginError = require("plugin-error");
var PLUGIN_NAME = "gulp-prettydiff";

/**
 * @module gulp-prettydiff
 * @description Transform Gulp streams with [Pretty Diff]{@link http://prettydiff.com/}
 * @param {object} options - Task options
 * @return {stream}
 */

module.exports = function(options) {
  options = options || {};
  return map(function(file, cb) {
    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, "Streams are not supported!"));
    }
    if (file.isBuffer()) {
      var config = clone(options);
      config.source = file.contents.toString();
      file.contents = new Buffer(prettydiff(config));
    }
    cb(null, file);
  });
};
