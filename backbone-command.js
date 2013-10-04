(function() {
	Backbone.Command = function (options) {
		this._configure(options || {});
	};

	_.extend(Backbone.Command.prototype, {

		injector: 'inject',

		_configure: function(options) {
			if(options.injector!=undefined) {
				options.injector.injectInto(this);
			}
		},

		execute:function () {

		}
	});

	//Like all Backbone classes, make use of the same extend method
	Backbone.Command.extend = Backbone.Router.extend;
})();;(function() {

	//Yaiks! Our only way into the router is the _bindRoutes. Unfortunately there is no _configure method such as we have within a View
	var _bindRoutes = Backbone.Router.prototype._bindRoutes;

	Backbone.CommandRouter = Backbone.Router.extend({

		injector: null,

		//We abuse this as our constructor. We want to initialize the injector. The initialize method could be used for this,
		//but this allows users to easily overwrite the method and breaking this class.
		_bindRoutes: function() {
			this.injector = new injector.Injector();

			_bindRoutes();
		},

		bindCommand: function(listenObject, event, command) {
			listenObject.on(event, this._executeCommand, {command:command, options:{injector:this.injector}});
		},

		_executeCommand: function(){
			var theCommand = new this.command(this.options);
			theCommand.execute();
			theCommand = null;
		}
	});

})();
