Backbone.Command = function () {};

_.extend(Backbone.Command.prototype, {
	execute:function () {

	}
});

//Like all Backbone classes, make use of the same extend method
Backbone.Command.extend = Backbone.Router.extend;