describe("Backbone.Command",function() {

	it("is present", function() {
		expect(Backbone.Command).not.toBeUndefined();
	});

	it("can be instantiated", function() {
		var commandInstance = new Backbone.Command();
		expect(commandInstance).toBeDefined();
	});

	it("has a execute method", function() {
		var commandInstance = new Backbone.Command();
		expect(typeof commandInstance.execute).toEqual("function")
	});

	it("can be extended", function() {
		var ExtendedCommand = Backbone.Command.extend({
			execute: function() {
				//My execution logic
				return "my overridden execute method";
			}
		});
		var commandInstance = new Backbone.Command();
		var extendedCommandInstance = new ExtendedCommand();
		expect(extendedCommandInstance).toBeDefined();
		expect(extendedCommandInstance.execute()).toEqual("my overridden execute method");
		expect(commandInstance.execute()).not.toEqual("my overridden execute method");
	});

	it("can be injected", function() {
		var ExtendedCommand = Backbone.Command.extend({
			model: 'inject'
		});

		var model = new Backbone.Model();
		var injectorInstance = new injector.Injector();

		injectorInstance.map('model').toValue(model);

		var extendedCommandInstance = new ExtendedCommand({injector:injectorInstance});

		expect(extendedCommandInstance.model).toEqual(model);
	});

	it("automatically injects the injector", function() {
		var injectorInstance = new injector.Injector();
		var commandInstance = new Backbone.Command({injector:injectorInstance});

		expect(commandInstance.injector).toEqual(injectorInstance);
	});

});