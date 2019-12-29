describe('PetFacet', function () {

	beforeEach(module('PetFacet'));

	it('is not defined', inject(function (petfacet) {
		expect(petfacet).toBeDefined();
		expect(petfacet.facets).toBeDefined();
		expect(petfacet.built).toBeDefined();
		expect(petfacet.initialize).toBeDefined();
		expect(petfacet.orderby).toBeDefined();
		expect(petfacet.clearSelections).toBeDefined();
		expect(petfacet.clearAll).toBeDefined();
		expect(petfacet.checkFilters).toBeDefined();
		expect(petfacet.buildFacets).toBeDefined();
	}));

	it('facets returns a bad result', inject(function (petfacet) {
		expect(petfacet.facets.ages).toBeDefined();
		expect(petfacet.facets.sizes).toBeDefined();
		expect(petfacet.facets.genders).toBeDefined();
		expect(petfacet.facets.locations).toBeDefined();
		expect(petfacet.facets.breeds).toBeDefined();
		expect(petfacet.facets.options).toBeDefined();
		petfacet.initialize();
		expect(petfacet.facets.ages).toBeDefined();
		expect(petfacet.facets.sizes).toBeDefined();
		expect(petfacet.facets.genders).toBeDefined();
		expect(petfacet.facets.locations).toBeDefined();
		expect(petfacet.facets.breeds).toBeDefined();
		expect(petfacet.facets.options).toBeDefined();
	}));

	it('built returns a bad result', inject(function (petfacet) {
		expect(petfacet.built.value).toBe(false);
		petfacet.built.value = true;
		expect(petfacet.built.value).toBe(true);
		petfacet.initialize();
		expect(petfacet.built.value).toBe(false);
	}));

	it('orderby returns a bad result', inject(function (petfacet) {
		expect(petfacet.orderby({ name: true })).toBe(true);
		var empty = {};
		expect(petfacet.orderby(empty)).toBe(empty);
	}));

	it('clearSelections returns a bad result', inject(function (petfacet) {
		// must pass a fn reference when toThrow is expected
		expect(petfacet.clearSelections).toThrow();
		expect(petfacet.clearSelections).toThrow(TypeError("Cannot read property 'length' of undefined"));
		// passing in a function with a parameter []
		expect(petfacet.clearSelections.bind(null, [])).not.toThrow();
		var obj = { selected: true };
		var arr = [obj];
		expect(obj.selected).not.toBe(null);
		expect(petfacet.clearSelections.bind(null, arr)).not.toThrow();
		expect(obj.selected).toBe(null);
	}));

	it('clearAll returns a bad result', inject(function (petfacet) {
		// must pass a fn reference when toThrow is expected
		expect(petfacet.clearAll).not.toThrow();
		// passing in a function with a parameter []
		var obj = { selected: true };
		expect(obj.selected).not.toBe(null);
		petfacet.facets.ages.value.push(obj);
		expect(petfacet.clearAll).not.toThrow();
		expect(obj.selected).toBe(null);
	}));

	it('buildFacets for a shelter returns a bad result', inject(function (petfacet) {
		var id = 123;
		var address1 = "123 main st";
		var shelter = { id: { "$t": id }, address1: { "$t": address1 } };
		var emptyValue = { $t: "" };
		expect(petfacet.buildFacets.bind(null, shelter)).toThrow();
		shelter.city = emptyValue;
		shelter.state = emptyValue;
		shelter.zip = emptyValue;
		petfacet.buildFacets(shelter);

		// locations length will be zero because the id was added to the "seen" array in the first call to buildFacets above
		expect(petfacet.facets.locations.value.length).toBe(0);
		// clear the seen array so we can try to build the facets again
		petfacet.initialize();
		petfacet.buildFacets(shelter);
		expect(petfacet.facets.locations.value.length).toBe(1);
		var facet = petfacet.facets.locations.value[0];
		expect(facet.id).toBeDefined();
		expect(facet.index).toBe(0);
		expect(facet.name).toBeDefined();
		expect(facet.count).toBe(1);
		expect(facet.selected).toBe(null);
	}));

	function createPet(id, $tValue) {
		var pet = { "id": { "$t": id } };
		pet.age = $tValue;
		pet.size = $tValue;
		pet.contact = { "zip": $tValue };
		pet.sex = $tValue;
		pet.breeds = { "breed": [$tValue, $tValue] };
		pet.options = { "option": [$tValue, $tValue] };
		return pet;
	}

	function createPetOneBreed(id, $tValue) {
		var pet = { "id": { "$t": id } };
		pet.age = $tValue;
		pet.size = $tValue;
		pet.contact = { "zip": $tValue };
		pet.sex = $tValue;
		pet.breeds = { "breed": $tValue };
		pet.options = { "option": [$tValue, $tValue] };
		return pet;
	}

	it('buildFacets for a pet returns a bad result (one breed)', inject(function (petfacet) {
		var $tValue = "a";
		var pet = createPetOneBreed(1, { $t: $tValue });
		petfacet.buildFacets(pet);

		expect(petfacet.facets.ages.value.length).toBe(1);
		expect(petfacet.facets.sizes.value.length).toBe(1);
		expect(petfacet.facets.locations.value.length).toBe(1);
		expect(petfacet.facets.genders.value.length).toBe(1);
		expect(petfacet.facets.breeds.value.length).toBe(1);
		expect(petfacet.facets.options.value.length).toBe(1);
		// should be one pet with one age
		var facet = petfacet.facets.ages.value[0];
		// id is the text 'id'+name field (age in this case)
		expect(facet.id).toBe('id' + $tValue);
		expect(facet.index).toBe(0);
		expect(facet.name).toBe($tValue);
		expect(facet.count).toBe(1);
		expect(facet.selected).toBe(null);
		// should be one pet with one breed
		var breeds = petfacet.facets.breeds.value[0];
		expect(breeds.id).toBe('id' + $tValue);
		expect(breeds.index).toBe(0);
		expect(breeds.name).toBe($tValue);
		expect(breeds.count).toBe(1);
		expect(breeds.selected).toBe(null);
		// should be one pet with an option twice - like if two pets had the same option
		var options = petfacet.facets.options.value[0];
		expect(options.id).toBe('id' + $tValue);
		expect(options.index).toBe(0);
		expect(options.name).toBe($tValue);
		// 2 options because emptyValue has the same $t value
		expect(options.count).toBe(2);
		expect(options.selected).toBe(null);
	}));

	it('buildFacets for a pet returns a bad result (mult breeds)', inject(function (petfacet) {
		var $tValue = "a";
		var pet = createPet(1, { $t: $tValue });
		petfacet.buildFacets(pet);

		expect(petfacet.facets.ages.value.length).toBe(1);
		expect(petfacet.facets.sizes.value.length).toBe(1);
		expect(petfacet.facets.locations.value.length).toBe(1);
		expect(petfacet.facets.genders.value.length).toBe(1);
		expect(petfacet.facets.breeds.value.length).toBe(1);
		expect(petfacet.facets.options.value.length).toBe(1);

		// same as last test
		var ages = petfacet.facets.ages.value[0];
		expect(ages.id).toBe('id' + $tValue);
		expect(ages.index).toBe(0);
		expect(ages.name).toBe($tValue);
		expect(ages.count).toBe(1);
		expect(ages.selected).toBe(null);

		// should be one pet with a breed twice - like if two pets had the same breed
		var breeds = petfacet.facets.breeds.value[0];
		expect(breeds.id).toBe('id' + $tValue);
		expect(breeds.index).toBe(0);
		expect(breeds.name).toBe($tValue);
		// 2 breeds because emptyValue has the same $t value
		expect(breeds.count).toBe(2);
		expect(breeds.selected).toBe(null);
	}));


	it('checkFilters for a pet returns a bad result', inject(function (petfacet) {
		// must have different id's and ages to succeed.
		// setting one of the ages as selected and then checking to see that ONLY one pet matches

		var pet = createPet(1, { $t: "a" });
		petfacet.buildFacets(pet);

		// always true when no filters selected
		expect(petfacet.checkFilters(pet)).toBe(true);

		var pet2 = createPet(2, { $t: "b" });
		petfacet.buildFacets(pet2);

		// still no filters selected
		expect(petfacet.checkFilters(pet2)).toBe(true);

		// set one of the filters to true
		petfacet.facets.ages.value[0].selected = true;
		var petMatch = petfacet.checkFilters(pet);
		var pet2Match = petfacet.checkFilters(pet2);

		// only ONE pet matches the age filter
		expect(petMatch).not.toEqual(pet2Match);

	}));


});