/**
 * @license MIT http://troopjs.mit-license.org/
 */
define(function MultiversionModule() {
	"use strict";

	/**
	 * RequireJS multiversion plugin
	 * @class requirejs.multiversion
	 * @extends requirejs.plugin
	 * @singleton
	 */

	//TODO Add usage docs

	var RE = /(.+?)#(.+)$/;
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

			parentRequire([ name ], function (module) {
				onload(module);
			}, onload.error);
		}
	};
});