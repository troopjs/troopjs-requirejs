/*!
 * TroopJS RequireJS sass plug-in
 * @license TroopJS Copyright 2012, Mikael Karon <mikael@karon.se>
 * Released under the MIT license.
 */
define([ "text", "sassjs" ], function SassModule(text, sassjs) {
	var RE_REPLACE = /(["\n\t\r])/gm;
	var REPLACE = {
		"\"" : "\\\"",
		"\n" : "\\n",
		"\t" : "\\t",
		"\r" : "\\r"
	};

	var buildMap = {};

	function replace(original, token) {
		return REPLACE[token] || token;
	}

	return {
		load : function(name, req, load, config) {
			text.load(name, req, function(value) {
				load(buildMap[name] = sassjs.render(value));
			}, config);
		},

		write : function(pluginName, moduleName, write, config) {
			if (moduleName in buildMap) {
				write.asModule(pluginName + "!" + moduleName, "define(function () { return \"" + buildMap[moduleName].replace(RE_REPLACE, replace) + "\"; });\n");
			}
		}
	};
});
