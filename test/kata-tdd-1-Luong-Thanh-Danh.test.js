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
	
	it("should return 6 for '1,2,3' string", function(){
		expect(testCalculator.add("1,2,3")).toEqual(6);
	})
	
	it("should return 6 for '1\\n2,3' string", function(){
		expect(testCalculator.add("1\n2,3")).toEqual(6);
	})
});