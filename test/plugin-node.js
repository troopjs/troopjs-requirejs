"use strict";
var buster = require("buster");
var assert = buster.referee.assert;

buster.testCase("plugin", function (run) {
	var fs = require("fs");
	var temp = require("temp");
	var requirejs = require("requirejs");

	run({
		"setUp": function (done) {
			var self = this;
			self.timeout = 1000;
			requirejs.config({
				"baseUrl": "./",
				"packages": [
					{
						"name" : "test",
						"location" : "test/assets"
					},
					{
						"name": "text",
						"location": "bower_components/requirejs-text",
						"main": "text"
					}
				],
				"maps": {
					"mv": "multiversion"
				},
				deps: ['require'],
				"callback": function(localRequire) {
					self.require = localRequire;
					done();
				}
			});
		},
		"shadow load non-amd module": function (done) {
			this.require(['shadow!test/foo#dep1=test/dep1&dep2=test/dep2&exports=Foo'], function(foo) {
				assert.equals(foo, "dep1,dep2,foo");
				done();
			});
		}
	});
});
