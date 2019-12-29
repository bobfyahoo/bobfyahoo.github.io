describe('PetFilter', function () {

	beforeEach(module('PetFilter'));

	var $filter, value = "a", obj = { "$t": value };

	beforeEach(inject(function (_$filter_) {
		$filter = _$filter_;
	}));

	it('is not defined', function () {
		expect($filter('checkmark')).toBeDefined();
		expect($filter('address')).toBeDefined();
		expect($filter('description')).toBeDefined();
		expect($filter('photos')).toBeDefined();
		expect($filter('shelters')).toBeDefined();
		expect($filter('sizes')).toBeDefined();
		expect($filter('sexes')).toBeDefined();
		expect($filter('status')).toBeDefined();
		expect($filter('breeds')).toBeDefined();
		expect($filter('options')).toBeDefined();
	});

	it('checkmark failed', function () {
		expect($filter('checkmark')("value")).toBe('\u2713');
		expect($filter('checkmark')(undefined)).toBe('\u2718');
	});

	it('address failed', function () {
		expect($filter('address')({ city: obj, state: obj, zip: obj })).toBe("a, a a");
		expect($filter('address')(undefined)).toBe(undefined);
	});

	it('description failed', function () {
		expect($filter('description')(obj)).toBe(value);
		expect($filter('description')(undefined)).toBe(undefined);
	});

	it('photos failed', function () {
		var size = { "@size": value };
		expect($filter('photos')([size], value)).toEqual([size]);
		expect($filter('photos')([])).toEqual([]);
	});

	it('shelters failed', function () {
		expect($filter('shelters')(value)).toBe(value);
		expect($filter('shelters')(undefined)).toBe(undefined);
	});

	it('sizes failed', function () {
		expect($filter('sizes')("S")).toBeDefined();
		expect($filter('sizes')("M")).toBeDefined();
		expect($filter('sizes')("L")).toBeDefined();
		expect($filter('sizes')("XL")).toBeDefined();
	});

	it('sexes failed', function () {
		expect($filter('sexes')("M")).toBeDefined();
		expect($filter('sexes')("F")).toBeDefined();
	});

	it('status failed', function () {
		expect($filter('status')("A")).toBeDefined();
	});

	it('breeds failed', function () {
		expect($filter('breeds')(undefined)).toBe('');
		expect($filter('breeds')(obj)).toBe(value);
		expect($filter('breeds')([obj, obj, obj])).toBe([value, value, value].join(", "));
	});

	it('options failed', function () {
		expect($filter('options')(undefined)).toBe('');
		expect($filter('options')(obj)).toBe(value);
		expect($filter('options')([obj, obj, obj])).toBe([value, value, value].join(", "));
	});
});