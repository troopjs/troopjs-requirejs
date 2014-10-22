/*
 * Note: This script is part of the shadow plugin and it not to be used standalone.
 * content of which is to be injected to prepend to an AMD module, overriding the original "define" function there.
 */

var args = arguments;
var __export__;

// override the "define" function in the shadow scope
function define(list, callback) {
	var RE_FUNC_PARAMS = /\(([^)]+)\)/;

	function getargs(fn) {
		return RE_FUNC_PARAMS.exec(fn.toString())[1].split(',').map(function(arg) {
			return arg.trim();
		});
	}

	var deps = getargs(callback);
	var actuals = getargs(moduleDefine);

	// re-order the dependencies according to name match.
	var vals = deps.map(function(dep) {
		return args[actuals.indexOf(dep)];
	});

	// invoke the module and to export the return value.
	return (__export__ = callback.apply(null, vals));
}
