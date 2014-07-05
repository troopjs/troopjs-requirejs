var config = module.exports;

config["node"] = {
	"environment": "node",

	"rootPath": "../",

	"tests": [
		"test/**/*-node.js"
	]
};

config["browser"] = {
	"environment": "browser",

	"rootPath": "../",

	"libs": [
		"bower_components/requirejs/require.js"
	],

	"resources": [
		"bower_components/**/*.js",
		"test/assets/**/*.js",
		"*.js"
	],

	"tests": [
		"test/**/*-browser.js"
	]
};
