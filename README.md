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

>     	a.the following input is ok:  “1\n2,3”  (will equal 6)  
>     	b.the following input is NOT ok:  “1,\n” (not need to prove it - just clarifying)

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

> 4.Support different delimiters  

>     	a.to change a delimiter, the beginning of the string will contain a separate line that looks like this:         “//[delimiter]\n[numbers…]” for example “//;\n1;2” should return three where the default delimiter is ‘;’ .  
>     	b.the first line is optional. all existing scenarios should still be supported

Continue TDD with \test\kata-tdd-1-Luong-Thanh-Danh.test.js

```JavaScript
	// Support different delimiters 
	it("should return 3 for '//;\\n1;2' string", function(){
		expect(testCalculator.add("//;\n1;2")).toEqual(3);
	})
	
	// Support different delimiters 
	it("should return 6 for '//;\\n1;2,3' string", function(){
		expect(testCalculator.add("//;\n1;2,3")).toEqual(6);
	})
	
	// Support different delimiters 
	it("should return 10 for '//;\\n1;2,3\n4' string", function(){
		expect(testCalculator.add("//;\n1;2,3\n4")).toEqual(10);
	})
```

Refactory with \src\kata-tdd-1-Luong-Thanh-Danh.js

```JavaScript
	add: function(numbers){
		var result = 0;
		var defaultDelimiters = ['\n',','];
		
		// return 0 for an empty string
		if(0 === numbers.length)
			return result;
		
		// get custom delimiter
		if(numbers.indexOf('//') == 0){
			var customDelimiter = numbers.substring(numbers.indexOf('//') + 2,numbers.indexOf('\n'));
			numbers = numbers.substring(numbers.indexOf('\n') + 1);
			defaultDelimiters.push(customDelimiter);
		}
		
		// split to array of number
		var regex = new RegExp( '[' + defaultDelimiters + ']+' , 'g');
		var inputs = numbers.split(regex);
		
		// sum of numbers
		for (var i = 0; i < inputs.length; i++) {
			result += parseInt(inputs[i]);
		}
		
		return result;
	}
```

> 5.Calling Add with a negative number will throw an exception “negatives not allowed” - and the negative that was passed.if there are multiple negatives, show all of them in the exception message 

Continue TDD with \test\kata-tdd-1-Luong-Thanh-Danh.test.js

```JavaScript
	// Calling Add with a negative number will throw an exception "negatives not allowed" - and the negative that was passed.
	// if there are multiple negatives, show all of them in the exception message
	it("should throw an exception when numbers contain negative number", function () {
		expect(function () {
			testCalculator.add("1,-2,-3")
		}).toThrowError("negatives not allowed: -2,-3");
	});
```

Refactory with \src\kata-tdd-1-Luong-Thanh-Danh.js

```JavaScript

		// catch negative numbers exception
		var negativeNumbers = numbers.match(/-\d+/g);
		if (negativeNumbers != null && negativeNumbers.length > 0) {
			throw new Error("negatives not allowed: " + negativeNumbers);
		}
		
		// split to array of number
		var regex = new RegExp('[' + defaultDelimiters + ']+', 'g');
		var inputs = numbers.split(regex);

```

> 6.Numbers bigger than 1000 should be ignored, so adding 2 + 1001  = 2

Continue TDD with \test\kata-tdd-1-Luong-Thanh-Danh.test.js

```JavaScript
	// Numbers bigger than 1000 should be ignored
	it("should return 2 for '2,1001' string. Numbers bigger than 1000 should be ignored", function () {
		expect(testCalculator.add("2,1001")).toEqual(2);
	})
```

Refactory with \src\kata-tdd-1-Luong-Thanh-Danh.js

```JavaScript

		// sum of numbers
		for (var i = 0; i < inputs.length; i++) {
			var numberToAdd = parseInt(inputs[i]);
			if (numberToAdd <= 1000) {
				result += parseInt(inputs[i]);
			}
		}

```

> 7.Delimiters can be of any length with the following format:  “//[delimiter]\n” for example: “//[***]\n1***2***3” should return 6

Continue TDD with \test\kata-tdd-1-Luong-Thanh-Danh.test.js

```JavaScript
	// Support different delimiters. Delimiters can be of any length with the following format: "//[delimiter]\n"
	it("should return 6 for '//[***]\\n1***2***3' string. Support different delimiters. Delimiters can be of any length with the following format: '//[delimiter]\n'", function () {
		expect(testCalculator.add("//[***]\n1***2***3")).toEqual(6);
	})
```

Refactory with \src\kata-tdd-1-Luong-Thanh-Danh.js

```JavaScript
		// get custom delimiter
		if (numbers.indexOf('//') == 0) {
			var customDelimiter = numbers.substring(numbers.indexOf('//') + 2, numbers.indexOf('\n'));
			numbers = numbers.substring(numbers.indexOf('\n') + 1);

			// check if custom delimiter in format "//[delimiter]\n" 
			var delimiters = customDelimiter.match(/[*]+/);

			if (delimiters != null) {
				for (i = 0; i < delimiters.length; i++) {
					defaultDelimiters.push(delimiters[i]);
				}
			} else {
				defaultDelimiters.push(customDelimiter);
			}
		}

```

> 8.Allow multiple delimiters like this:  “//[delim1][delim2]\n” for example “//[*][%]\n1*2%3” should return 6.

Continue TDD with \test\kata-tdd-1-Luong-Thanh-Danh.test.js

```JavaScript
	// Support different delimiters. Delimiters can be of any length with the following format: "//[delimiter]\n"
	it("should return 6 for '//[***]\\n1***2***3' string. Support different delimiters. Delimiters can be of any length with the following format: '//[delimiter]\\n'", function () {
		expect(testCalculator.add("//[***]\n1***2***3")).toEqual(6);
	})
	
	it("should return 6 for '//[aaa]\\n1aaa2aaa3' string. Support different delimiters. Delimiters can be of any length with the following format: '//[delimiter]\\n'", function () {
		expect(testCalculator.add("//[aaa]\n1aaa2aaa3")).toEqual(6);
	})

	// Support different delimiters. Allow multiple delimiters like this: "//[delim1][delim2]\n"
	it("should return 6 for '//[*][%]\\n1*2%3' string. Support different delimiters. Allow multiple delimiters like this: '//[delim1][delim2]\\n'", function () {
		expect(testCalculator.add("//[*][%]\n1*2%3")).toEqual(6);
	})
```

Refactory with \src\kata-tdd-1-Luong-Thanh-Danh.js

```JavaScript
		var customDelimiter = numbers.substring(numbers.indexOf('//') + 2, numbers.indexOf('\n'));
		numbers = numbers.substring(numbers.indexOf('\n') + 1);

		// check if custom delimiter in format "//[delimiter]\n"
		var delimiters = customDelimiter.match(/\[(.*?)\]/g);

		if (delimiters != null) {
			for (i = 0; i < delimiters.length; i++) {
				var delimiter = delimiters[i];
				// remove square brackets
				defaultDelimiters.push(delimiter.substring(1,delimiter.length-1));
			}
		} else {
			defaultDelimiters.push(customDelimiter);
		}

```

> 9.make sure you can also handle multiple delimiters with length longer than one char

The code above already solve this problem. What we need to do is add some comments, re-format the .js files

Final \test\kata-tdd-1-Luong-Thanh-Danh.test.js

```JavaScript
describe("String Calculator", function () {

	var testCalculator = StringCalculator.stringCalculator;
	
	// 1. The method can take 0, 1 or 2 numbers, and will return their sum
	// (for an empty string it will return 0)
	it("should return 0 for an empty string", function () {
		expect(testCalculator.add("")).toEqual(0);
	})
	
	// 2. The method can take 0, 1 or 2 numbers, and will return their sum
	// (for an empty string it will return 0)
	it("should return 1 for '1' string", function () {
		expect(testCalculator.add("1")).toEqual(1);
	})
	
	// 3. The method can take 0, 1 or 2 numbers, and will return their sum
	// (for an empty string it will return 0)
	it("should return 3 for '1,2' string", function () {
		expect(testCalculator.add("1,2")).toEqual(3);
	})
	
	// 4. Allow the Add method to handle an unknown amount of numbers
	it("should return 6 for '1,2,3' string. Allow the Add method to handle an unknown amount of numbers", function () {
		expect(testCalculator.add("1,2,3")).toEqual(6);
	})
	
	// 5. Allow the Add method to handle new lines between numbers (instead of commas).
	it("should return 6 for '1\\n2,3' string. Allow the Add method to handle new lines between numbers", function () {
		expect(testCalculator.add("1\n2,3")).toEqual(6);
	})
	
	// 6. Support different delimiters "//[delimiter]\n[numbers...]"
	it("should return 3 for '//;\\n1;2' string. Support different delimiters", function () {
		expect(testCalculator.add("//;\n1;2")).toEqual(3);
	})
	
	// 7. Support different delimiters "//[delimiter]\n[numbers...]"
	it("should return 6 for '//;\\n1;2,3' string. Support different delimiters", function () {
		expect(testCalculator.add("//;\n1;2,3")).toEqual(6);
	})
	
	// 8. Support different delimiters "//[delimiter]\n[numbers...]"
	it("should return 10 for '//;\\n1;2,3\n4' string. Support different delimiters", function () {
		expect(testCalculator.add("//;\n1;2,3\n4")).toEqual(10);
	})
	
	// 9. Calling Add with a negative number will throw an exception "negatives not allowed" - and the negative that was passed.
	// if there are multiple negatives, show all of them in the exception message
	it("should throw an exception when numbers contain negative number", function () {
		expect(function () {
			testCalculator.add("1,-2,-3")
		}).toThrowError("negatives not allowed: -2,-3");
	});
	
	// 10. Numbers bigger than 1000 should be ignored
	it("should return 2 for '2,1001' string. Numbers bigger than 1000 should be ignored", function () {
		expect(testCalculator.add("2,1001")).toEqual(2);
	})
	
	// 11. Support different delimiters. Delimiters can be of any length with the following format: "//[delimiter]\n"
	it("should return 6 for '//[***]\\n1***2***3' string. Support different delimiters. Delimiters can be of any length with the following format: '//[delimiter]\\n'", function () {
		expect(testCalculator.add("//[***]\n1***2***3")).toEqual(6);
	})
	
	// 12. Support different delimiters. Delimiters can be of any length with the following format: "//[delimiter]\n"
	it("should return 6 for '//[aaa]\\n1aaa2aaa3' string. Support different delimiters. Delimiters can be of any length with the following format: '//[delimiter]\\n'", function () {
		expect(testCalculator.add("//[aaa]\n1aaa2aaa3")).toEqual(6);
	})
	
	// 13. Support different delimiters. Allow multiple delimiters like this: "//[delim1][delim2]\n"
	it("should return 6 for '//[*][%]\\n1*2%3' string. Support different delimiters. Allow multiple delimiters like this: '//[delim1][delim2]\\n'", function () {
		expect(testCalculator.add("//[*][%]\n1*2%3")).toEqual(6);
	})
	
	// 14. Support different delimiters. Allow multiple delimiters with length longer than one char like this: "//[delim1][delim2]\n"
	it("should return 6 for '//[**][aaa]\\n1**2aaa3' string. Support different delimiters. Allow multiple delimiters with length longer than one char like this: '//[delim1][delim2]\\n'", function () {
		expect(testCalculator.add("//[**][aaa]\n1**2aaa3")).toEqual(6);
	})

});

```

Final \src\kata-tdd-1-Luong-Thanh-Danh.js

```JavaScript
if (typeof StringCalculator == 'undefined') {
	StringCalculator = {};
}

StringCalculator.stringCalculator = {
	add : function (numbers) {
		var result = 0;
		var defaultDelimiters = ['\n', ','];

		// return 0 for an empty string
		if (0 === numbers.length)
			return result;

		// get custom delimiter
		if (numbers.indexOf('//') == 0) {
			var customDelimiter = numbers.substring(numbers.indexOf('//') + 2, numbers.indexOf('\n'));
			numbers = numbers.substring(numbers.indexOf('\n') + 1);

			// check if custom delimiter in format "//[delimiter]\n"
			var delimiters = customDelimiter.match(/\[(.*?)\]/g);

			if (delimiters != null) {
				for (i = 0; i < delimiters.length; i++) {
					var delimiter = delimiters[i];
					// remove square brackets
					defaultDelimiters.push(delimiter.substring(1,delimiter.length-1));
					//defaultDelimiters.push(delimiter.replace(/\[|\]/gi, ''));
				}
			} else {
				defaultDelimiters.push(customDelimiter);
			}
		}

		// catch negative numbers exception
		var negativeNumbers = numbers.match(/-\d+/g);
		if (negativeNumbers != null && negativeNumbers.length > 0) {
			throw new Error("negatives not allowed: " + negativeNumbers);
		}

		// split to array of number
		var regex = new RegExp('[' + defaultDelimiters + ']+', 'g');
		var inputs = numbers.split(regex);

		// sum of numbers
		for (var i = 0; i < inputs.length; i++) {
			var numberToAdd = parseInt(inputs[i]);
			if (numberToAdd <= 1000) {
				result += parseInt(inputs[i]);
			}
		}

		return result;
	}
};
```
