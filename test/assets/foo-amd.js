define(['test/dep1', 'test/dep2'], function(dep1, dep2) {
	return [dep1, dep2, "foo"].join(',');
});
