describe('#snakeToCamel', () => {
	it('passes_standard_cases', function () {
		expect(snakeToCamel('awesome_sauce')).toBe('awesomeSauce');
		expect(snakeToCamel('a_man_a_plan')).toBe('aManAPlan');
		expect(snakeToCamel('HOW_ABOUT_NOW?')).toBe('HOWABOUTNOW?');
	});
});
describe('#starOutGrid', () => {
	it('should not change grid without stars', function () {
		expect(
			starOutGrid([
				['A', 'B', 'C'],
				['D', 'E', 'F'],
				['G', 'H', 'I'],
			])
		).toEqual([
			['A', 'B', 'C'],
			['D', 'E', 'F'],
			['G', 'H', 'I'],
		]);
	});
	it('should star-out row and col that has a star', function () {
		expect(
			starOutGrid([
				['A', 'B', 'C'],
				['D', 'E', '*'],
				['G', 'H', 'I'],
			])
		).toEqual([
			['A', 'B', '*'],
			['*', '*', '*'],
			['G', 'H', '*'],
		]);
	});
	it('should work with multiple stars', function () {
		expect(
			starOutGrid([
				['*', 'B', 'C'],
				['D', 'E', '*'],
				['G', 'H', 'I'],
			])
		).toEqual([
			['*', '*', '*'],
			['*', '*', '*'],
			['*', 'H', '*'],
		]);
	});
	it('should work with non-square grids:', function () {
		expect(
			starOutGrid([
				['*', 'B', 'C'],
				['D', 'E', '*'],
				['G', 'H', 'I'],
				['J', 'K', 'L'],
			])
		).toEqual([
			['*', '*', '*'],
			['*', '*', '*'],
			['*', 'H', '*'],
			['*', 'K', '*'],
		]);
	});
});
