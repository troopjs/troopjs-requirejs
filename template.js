/*!
 * TroopJS template
 * 
 * @license TroopJS 0.0.1 Copyright 2012, Mikael Karon <mikael@karon.se>
 * Released under the MIT license.
 */
/**
 * This plugin provides a template loader and compiler.
 */
define(["text"], function TemplateModule(text) {
	var RE_SANITIZE = /^[\n\t\r]+|[\n\t\r]+$/g;
	var RE_BLOCK = /<%(=)?([\S\s]*?)%>/g;
	var RE_TOKENS = /<%(\d+)%>/gm;
	var RE_REPLACE = /(["\n\t\r])/gm;
	var RE_CLEAN = /o \+= "";| \+ ""/gm;
	var REPLACE = {
		"\"": "\\\"",
		"\n": "\\n",
		"\t": "\\t",
		"\r": "\\r"
	};

	var buildMap = {};

	/**
	 * Compiles template
	 * @param body Template body
	 * @returns {Function}
	 */
	function compile(body) {
		var blocks = [];
		var length = 0;

		function blocksTokens (original, prefix, block) {
			blocks[length] = prefix
				? "\" +" + block + "+ \""
				: "\";" + block + "o += \"";

			return "<%" + String(length++) + "%>";
		}

		function tokensBlocks (original, token) {
			return blocks[token];
		}

		function replace(original, token) {
			return REPLACE[token] || token;
		}

		return new Function("data", ("var o; o = \""
			// Sanitize body before we start templating
			+ body.replace(RE_SANITIZE, "")

			// Replace script blocks with tokens
			.replace(RE_BLOCK, blocksTokens)

			// Replace unwanted tokens
			.replace(RE_REPLACE, replace)

			// Replace tokens with script blocks
			.replace(RE_TOKENS, tokensBlocks)

			+ "\"; return o;")

			// Clean
			.replace(RE_CLEAN, ""));
	}

	return {
		load: function (name, req, load, config) {
			text.load(name, req, function (value) {
				// Compile template and store in buildMap
				var template = buildMap[name] = compile(value);

				// Set display name for debugging
				template.displayName = name;

				// Pass template to load
				load(template);
			}, config);
		},

		write: function (pluginName, moduleName, write, config) {
			if (moduleName in buildMap) {
				write.asModule(pluginName + "!" + moduleName, "define(function () { return " + buildMap[moduleName].toString().replace(RE_SANITIZE, "") + ";});\n");
			}
		}
	};
});
