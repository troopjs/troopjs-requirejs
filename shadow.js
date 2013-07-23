/**
* TroopJS jquery/destroy
* @license MIT http://troopjs.mit-license.org/ © Tristan Guo mailto:tristanguo@outlook.com
*/
define([ "text" ], function (text) {
	"use strict";

	var EXPORTS = "exports";
	var EXTENSION = ".js";
	var PATTERN = /(.+?)#(.+)$/;

	function amdify (scriptText, hashVal) {
		var pattern = /([^=&]+)=([^&]+)/g;
		var deps = [];
		var args = [];
		var m;

		while (m = pattern.exec(hashVal)) {
			if (m[1] === EXPORTS) {
				scriptText += "\nreturn " + m[2]; + ";\n";
			}
			else {
				deps.push("'" + m[2] + "'");
				args.push(m[1]);
			}
		}

		return "define([ " + deps.join(", ") + " ], function (" + args.join(", ") + ") {\n"
			+ scriptText
			+ " });"
	}

	return {
		load : function (name, req, onLoad, config) {

			var hashVal;
			var amdifiedText;
			var m;

			if (m = PATTERN.exec(name)) {
				name = m[1];
				hashVal = m[2];

				text.get(req.toUrl(name + EXTENSION), function(text) {
					amdifiedText = amdify(text, hashVal);
					onLoad.fromText(name, amdifiedText);
				});
			}
			else {
				req([ name ], function (module) {
					onLoad(module);
				}, onLoad.error);
			}
		}
	};
});
