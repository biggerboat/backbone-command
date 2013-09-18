Backbone.Command = function () {};

_.extend(Backbone.Command.prototype, {
	execute:function () {

	}
});

//Like all Backbone classes, make use of the same extend method
Backbone.Command.extend = Backbone.Router.extend;;Backbone.CommandRouter = Backbone.Router.extend({

	bindCommand: function(listenObject, event, command) {
		listenObject.on(event, this._executeCommand, {command:command});
	},

	_executeCommand: function(){
		var theCommand = new this.command(this.options);
		theCommand.execute();
		theCommand = null;
	}
});