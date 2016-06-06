$(function() {
	var watcher_ = function(node) {
		this.__proto__ = new watcher_proto();
		this.callback = null;
		this.debug = false;

		if(node.length>1) {
			throw new Error('only 4 single elements');
		}

		var element = $(node[0]),
			that = this,
			_interval = null,
			old_value = element.val();

		var start_watch = function() {
			stop_watch();
			that.loger('start', 'event')
			_interval = setInterval(function() {
				if(element.val()!=old_value) {
					old_value = element.val();
					drop_callback();
				}
			}, 100);
		};

		var stop_watch = function() {
			if(_interval!==null) {
				that.loger('stop', 'event')
				clearInterval(_interval);
			}
		};

		var drop_callback = function() {
			if(that.callback!==null){
				that.callback(element.val(), element);
			};
		};

		

		element.on('blur', function() {
			that.loger('blur', 'event');
			stop_watch();
		});

		element.on('focus', function() {
			that.loger('focus', 'event');
			start_watch();
		});
	}

	var watcher_proto = function() {
		this.loger = function(text, type) {
			if(this.debug){
				console.log(text)
			}
		}

		this.set_callback = function(function_name) {
			this.callback = function_name;
			return this;
		}

		this.break = function() {
			this.element = null;
			this.callback = null;
			return this;
		}
	}

	$.watcher_stack = {
		elements: new Array(),
		calls: new Array()
	}

	$.fn.watcher = function() {
		for (var id in $.watcher_stack.elements) {
			if(($($.watcher_stack.elements[id]).index()===$(this).index())) {
				return $.watcher_stack.calls[id];
			}
		}

		var foo = new watcher_(this);
		$.watcher_stack.elements.push(this);
		$.watcher_stack.calls.push(foo);

		return foo;
	}
});