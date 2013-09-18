describe("Backbone.CommandRouter",function() {

	beforeEach(function() {
		this.addMatchers({
			toHaveListenersFor: function(eventName) {
				if(this.actual._events==undefined) {
					return false;
				} else {
					return this.actual._events[eventName].length>0;
				}
			}
		});
	});

	it("is present", function() {
		expect(Backbone.CommandRouter).not.toBeUndefined();
	});

	it("can be instantiated", function() {
		var routerInstance = new Backbone.CommandRouter();
		expect(routerInstance).toBeDefined();
	});

	it("the test works with a custom Jasmine matcher", function() {
		var myModel = new Backbone.Model({myValue:''});
		expect(myModel).not.toHaveListenersFor('change:myValue');
		myModel.on("change:myValue", function(){});
		expect(myModel).toHaveListenersFor('change:myValue');
	});

	it("has a listener after binding the command", function() {
		var myModel = new Backbone.Model({myValue:''});
		var myRouter = new Backbone.CommandRouter();

		expect(myModel).not.toHaveListenersFor('change:myValue');
		myRouter.bindCommand(myModel, "change:myValue", Backbone.Command);
		expect(myModel).toHaveListenersFor('change:myValue');
	});

	it("executes the command", function() {
		var isExecuted = false;
		var myModel = new Backbone.Model({myValue:''});
		var myRouter = new Backbone.CommandRouter();
		var MyCommand = Backbone.Command.extend({
			execute: function() {
				isExecuted = true;
			}
		});

		myRouter.bindCommand(myModel, "change:myValue", MyCommand);

		expect(isExecuted).toBeFalsy();
		myModel.set({myValue:'newValue'});
		expect(isExecuted).toBeTruthy();
	});

});