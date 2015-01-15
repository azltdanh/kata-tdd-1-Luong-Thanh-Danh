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
