# backbone-command [![Build Status](https://travis-ci.org/biggerboat/backbone-command.png)](https://travis-ci.org/biggerboat/backbone-command)

Execution of [commands](http://en.wikipedia.org/wiki/Command_pattern) upon event triggers.
This is build for usage with [Backbone](https://github.com/jashkenas/backbone) and relies on [injector.js](https://github.com/biggerboat/injector.js)

## Install
You could just download ```backbone-command.js``` or ```backbone-command.min.js``` from the project root.

We advise you to download it using [Bower](http://http://bower.io/) instead:
```
bower install backbone-command
```
This command will automatically download all dependencies. So in this case it takes care of downloading
[injector.js](https://github.com/biggerboat/injector.js), jQuery, Backbone and Underscore for you.

## Theory
Essentially a command is just a class with one method function. This method gets executed and then the command
instance stops to exist. As the command is a single class and can live in a separate file, it can be nicely separated from
the rest of your application. It helps keeping your classes decoupled by separating the action from the rest of the system.
Say you have a search view. Once the user enters a new search query we should execute a search. The view should not know about
how such logic is handled, all it knows is that it has to set the search query on a model. A command can then take care of
executing the desired logic. This might mean a backend call and changing the loading property to true on a model for example.
Commands are essentially the glue of your application. Your models and views should be completely agnostic,
but the command can bring all of these together. A command has access to the injector and therefor usually has access to everything it needs.

## Usage
A typical command looks as follows:
```JavaScript
var YourCommand = Backbone.Command.extend({
	someModel: 'inject',

	execute: function() {
		//Your logic...
	}
});
```

In the current setup the router is (ab)used as the central place that connects events to the execution of commands, but also takes
care registering injector rules. An ```injector``` is automatically instantiated for you when you extend the ```Backbone.CommandRouter```

A very basic extended CommandRouter would look like this:
```JavaScript
var ApplicationRouter = Backbone.CommandRouter.extend({
	initialize: function() {
		var someModel = new Backbone.Model();
		this.injector.map('someModel').toValue(someModel);

		this.bindCommand(someModel, "change:someProperty", YourCommand);
	}
});
```
In this example we register ```someModel``` to the injector and map a change of ```someProperty``` to the execution of ```YourCommand```

### Example implementation
Please refer to [Navigator-Injector-Backbone-Command-TodoMVC example](https://github.com/BiggerBoat/nibc-todomvc) for details of how this library can be used.

## Support
Feel free to create a [new issue](https://github.com/biggerboat/backbone-command/issues/new) for all your questions, issues or feature requests.
