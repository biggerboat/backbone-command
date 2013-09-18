Backbone.CommandRouter = Backbone.Router.extend({

	bindCommand: function(listenObject, event, command) {
		listenObject.on(event, this._executeCommand, {command:command});
	},

	_executeCommand: function(){
		var theCommand = new this.command(this.options);
		theCommand.execute();
		theCommand = null;
	}
});