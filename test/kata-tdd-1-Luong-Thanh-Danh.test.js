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
