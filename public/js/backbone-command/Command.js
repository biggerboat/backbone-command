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
})();