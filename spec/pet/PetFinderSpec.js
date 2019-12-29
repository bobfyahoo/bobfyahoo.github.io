describe('PetFinder', function () {

	beforeEach(module('PetFinder'));

	// mock petcache
	beforeEach(module(function ($provide, $sceDelegateProvider) {
		$provide.value('petcache', {
			get: function () { },
			put: function () { }
		});
		$sceDelegateProvider.resourceUrlWhitelist([
			// allow google functions
			'**//us-central1-igneous-future-108923.cloudfunctions.net/**'
		  ]);
	}));

	it('is not defined', inject(function (petfinder) {
		expect(petfinder).toBeDefined();
	}));

	it('findPets returns a bad result', inject(function (petfinder, $httpBackend) {
		$httpBackend.expectJSONP("//us-central1-igneous-future-108923.cloudfunctions.net/pets?&callback=bobf&path=pet.find&animal=dog&count=100&format=json&location=92618&offset=0").respond({ a: true });

		var result = false;
		var success = function () {
			result = true;
		};
		petfinder.findPets({ animal: 'dog', location: '92618' }, success);
		$httpBackend.flush();
		expect(result).toBe(true);
	}));
	it('findPets returns a bad result', inject(function (petfinder, $httpBackend) {
		$httpBackend.expectJSONP("//us-central1-igneous-future-108923.cloudfunctions.net/pets?&callback=bobf&path=shelter.find&animal=dog&count=100&format=json&location=92618&offset=0").respond({ a: true });

		var result = false;
		var success = function () {
			result = true;
		};
		petfinder.findShelters({ location: '92618' }, success);
		$httpBackend.flush();
		expect(result).toBe(true);
	}));

	it('angular.extend vs Object.assign', inject(function (petfinder) {
		// just wanted to compare angular.extend with object.assign.  it's being used in petfinder.js
		var one = { count: 100, callback: 'JSON_CALLBACK' };
		var two = { animal: 'dog', location: '92618' };
		var params = angular.extend({}, one, two);
		var params2 = Object.assign({}, one, two);
		expect(params).toEqual(params2);
	}));
});