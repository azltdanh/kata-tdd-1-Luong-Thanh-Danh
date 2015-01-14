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