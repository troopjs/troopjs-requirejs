/**
 * @license MIT http://troopjs.mit-license.org/
 */
define([
	"text",
	"troopjs-util/select",
	"poly/json"
], function (text, select) {
	"use strict";

	/**
	 * RequireJS json plugin
	 * @class requirejs.json
	 * @static
	 * @alias plugin.requirejs
	 */

	//TODO Add usage docs

	var NULL = null;
	var PATTERN = /(.+?)#(.+)$/;
	var buildMap = {};


	return {
		"load": function (name, req, load, config) {
			var key = name;
			var query = "";
			var matches;

			if ((matches = PATTERN.exec(name)) !== NULL) {
				name = matches[1];
				query = matches[2];
			}

			text.get(req.toUrl(name), function (source) {
				var compiled = select.call(JSON.parse(source), query);

				if (config.isBuild) {
					buildMap[key] = compiled;
				}

				load(compiled);
			}, load.error);
		},

		write : function (pluginName, moduleName, write) {
			if (moduleName in buildMap) {
				write("define('" + pluginName + "!" + moduleName + "', function(){ return " + JSON.stringify(buildMap[moduleName]) + "});");
			}
		}
	};
});
