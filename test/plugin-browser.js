buster.testCase("plugin", function (run){
	"use strict";

	var assert = buster.referee.assert;
	var refute = buster.referee.refute;

	run({
		"setUp": function (done) {
			var self = this;
			self.timeout = 1000;
			require.config({
				"baseUrl": "./",
				"packages": [
					{
						"name": "test",
						"location": "test/assets"
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
		"shadow load non-amd module": function(done) {
			this.require(['shadow!test/foo#dep1=test/dep1&dep2=test/dep2&exports=Foo'], function(foo) {
				assert.equals(foo, "dep1,dep2,foo");
				done();
			});
		}
	});
});
