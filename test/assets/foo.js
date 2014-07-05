(function(dep1, dep2) {
	var g = typeof window !== 'undefined' ? window : global;
	g.Foo = [dep1, dep2,"foo"].join(',');
})(dep1, dep2);
