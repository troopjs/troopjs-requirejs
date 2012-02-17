/*!
 * TroopJS detect
 * 
 * @license TroopJS 0.0.1 Copyright 2012, Mikael Karon <mikael@karon.se>
 * Released under the MIT license.
 */
/**
 * This plugin provides a loader for hasjs detection.
 */
define(["has", "text"], function DetectModule(has, text) {
	var buildMap = {};

	return {
		load: function (name, req, load, config) {
			text.load(name, req, function (value) {
				load(new Function("has", buildMap[name] = value)(has));
			}, config);
		},

		write: function (pluginName, moduleName, write, config) {
			if (moduleName in buildMap) {
				write.asModule(pluginName + "!" + moduleName, "define(['has'], function (has) { " + buildMap[moduleName] + " });\n");
			}
		}
	};
});