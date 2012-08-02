/*!
 * TroopJS RequireJS detect plug-in
 * @license TroopJS Copyright 2012, Mikael Karon <mikael@karon.se>
 * Released under the MIT license.
 */
/*jshint strict:false, smarttabs:true, evil:true */
/*global define:true */
define([ "has", "text" ], function DetectModule(has, text) {
	var buildMap = {};

	return {
		load : function(name, req, load, config) {
			text.load(name, req, function(value) {
				load(Function("has", buildMap[name] = value)(has));
			}, config);
		},

		write : function(pluginName, moduleName, write, config) {
			if (moduleName in buildMap) {
				write.asModule(pluginName + "!" + moduleName, "define(['has'], function (has) { " + buildMap[moduleName] + " });\n");
			}
		}
	};
});