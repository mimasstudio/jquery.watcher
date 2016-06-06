# jquery.watcher
Watcher of inputs

#usage:
$(function() {
	// init callback function
	var foo1 = function (value, element) {
		console.log('foo1',value, element);
	}
	//start watch
	var w = $('textarea').watcher().set_callback(foo1);
	
	// init new callback function
	var foo2 = function (value, element) {
		console.log('foo2',value, element);
	}
	//set new callback
	w.set_callback(foo2);
	
	//stop watchign
	w.break();
});