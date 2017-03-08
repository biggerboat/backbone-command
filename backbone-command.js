/*
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:</p>

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

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
			theCommand.execute.apply(theCommand, arguments);
			theCommand = null;
		}
	});

})();
