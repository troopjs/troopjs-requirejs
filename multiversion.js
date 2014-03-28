/*
 * TroopJS requirejs/multiversion
 * @license MIT http://troopjs.mit-license.org/ © Mikael Karon mailto:mikael@karon.se
 */
define(function MultiVersionModule() {
	"use strict";
	
	var UNDEFINED;
	var RE = /(.+?)#(.+)$/;
	var RE_EMPTY = /^empty:/;
	var CONTEXTS = require.s.contexts;

	return {
		"load" : function (name, parentRequire, onload) {
			var context;
			var matches;

			// if name matches RE
			// matches[0] : module name with context - "module/name#context"
			// matches[1] : module name - "module/name"
			// matches[2] : context name - "context"
			if ((matches = RE.exec(name)) !== null) {
				name = matches[1];
				context = matches[2];

				if (context in CONTEXTS) {
					parentRequire = CONTEXTS[context].require;
				}
			}

			if (RE_EMPTY.test(parentRequire.toUrl(name + ".js"))) {
				onload(UNDEFINED);
			}
			else {
				parentRequire([ name ], function (module) {
					onload(module);
				}, onload.error);
			}
		}
	};
});