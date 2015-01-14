if(typeof StringCalculator == 'undefined') {
	StringCalculator = {};
}

StringCalculator.stringCalculator = {
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
};