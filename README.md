# kata-tdd-1-Luong-Thanh-Danh
kata http://osherove.com/tdd-kata-1

## Set up environment:

### Install Node.js 

at http://nodejs.org/


### Install Karma, a test runner 

http://karma-runner.github.io/0.12/index.html

The recommended approach is to install Karma (and all the plugins your project needs) locally in the project's directory.

#### Install Karma:

```
$ npm install karma --save-dev
```

#### Install plugins that your project needs:

```
$ npm install karma-jasmine karma-chrome-launcher --save-dev
```

#### Install karma-cli globally.

```
$ npm install -g karma-cli
```

#### Configure Karma for the project:

```
$ karma init karma.conf.js
```

#### Run Karma:

```
$ karma start karma.conf.js
```

### Install JSHint, a tool that helps to detect errors and potential problems in your JavaScript code. 

http://jshint.com/

```
$ npm install jshint
```

### Install Grunt, The Javascript Task Runner 

http://gruntjs.com

```
$ npm install -g grunt-cli
```

#### Install the latest version of Grunt in your project folder, adding it to your devDependencies

```
$ npm install grunt --save-dev
```

#### Install the JSHint task module

```
$ npm install grunt-contrib-jshint --save-dev
```

#### Install the uglify task module

```
$ npm install grunt-contrib-uglify --save-dev
```

## String Calculator

The following is a TDD Kata- an exercise in coding, refactoring and test-first, that you should apply daily for at least 15 minutes (I do 30).

##Before you start: 

- Try not to read ahead.
- Do one task at a time. The trick is to learn to work incrementally.
- Make sure you only test for correct inputs. there is no need to test for invalid inputs for this kata


> 1.Create a simple String calculator with a method int Add(string numbers)

>    	a.The method can take 0, 1 or 2 numbers, and will return their sum (for an empty string it will return 0) for example “” or “1” or “1,2”
>    	b.Start with the simplest test case of an empty string and move to 1 and two numbers
>    	c.Remember to solve things as simply as possible so that you force yourself to write tests you did not think about
>    	d.Remember to refactor after each passing test

Start TDD with \test\kata-tdd-1-Luong-Thanh-Danh.test.js

```JavaScript
describe("String Calculator",function(){
	
	var testCalculator = StringCalculator.stringCalculator;
	
	it("should return 0 for an empty string", function(){
		expect(testCalculator.add("")).toEqual(0);
	})
	
	it("should return 1 for '1' string", function(){
		expect(testCalculator.add("1")).toEqual(1);
	})
	
	it("should return 3 for '1,2' string", function(){
		expect(testCalculator.add("1,2")).toEqual(3);
	})
});
```

Start implement with \src\kata-tdd-1-Luong-Thanh-Danh.js

```JavaScript
if(typeof StringCalculator == 'undefined') {
	StringCalculator = {};
}

StringCalculator.stringCalculator = {
	add: function(numbers){
		var result = 0;
		
		if(0 === numbers.length)
			return result;
			
		var inputs = numbers.split(',');
		
		for (var i = 0; i < inputs.length; i++) {
			result += parseInt(inputs[i]);
		}
		
		return result;
	}
};
```

> 2.Allow the Add method to handle an unknown amount of numbers

Continue TDD with \test\kata-tdd-1-Luong-Thanh-Danh.test.js

```JavaScript
	it("should return 6 for '1,2,3' string", function(){
		expect(testCalculator.add("1,2,3")).toEqual(6);
	})
```

Refactory with \src\kata-tdd-1-Luong-Thanh-Danh.js

```JavaScript
		for (var i = 0; i < inputs.length; i++) {
			result += parseInt(inputs[i]);
		}
```

The code above already solve the problem, so don't need to do anything about this step.

> 3.Allow the Add method to handle new lines between numbers (instead of commas).  
> 	| a.the following input is ok:  “1\n2,3”  (will equal 6)  
> 	| b.the following input is NOT ok:  “1,\n” (not need to prove it - just clarifying)

Continue TDD with \test\kata-tdd-1-Luong-Thanh-Danh.test.js

```JavaScript
	it("should return 6 for '1\\n2,3' string", function(){
		expect(testCalculator.add("1\n2,3")).toEqual(6);
	})
```

Refactory with \src\kata-tdd-1-Luong-Thanh-Danh.js

```JavaScript
		var inputs = numbers.split(/[\n,]+/);
```

What we do is change ```numbers.split(',')``` to ```numbers.split(/[\n,]+/)```
