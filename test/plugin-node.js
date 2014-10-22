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
				"baseUrl": "./bower_components",
				"paths": {
					"shadow": "../shadow",
					"json": "../json",
					"mv": "../multiversion"
				},
				"packages": [
					{
						"name" : "test",
						"location": "../test/assets"
					},
					{
						"name": "text",
						"location": "requirejs-text",
						"main": "text"
					}
				],
				deps: ['require'],
				"callback": function(localRequire) {
					self.require = localRequire;
					done();
				}
			});
		},
		"shadow load - non-amd module": function(done) {
			this.require(['shadow!test/foo#dep1=test/dep1&dep2=test/dep2&exports=Foo'], function(foo) {
				assert.equals(foo, "export1,export2,foo");
				done();
			});
		},
		"shadow load - amd module": function(done) {
			this.require(['shadow!test/foo-amd#dep2=test/dep2&dep1=test/dep1'], function(foo) {
				assert.equals(foo, "export1,export2,foo");
				done();
			});
		}
	});
});
