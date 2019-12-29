describe('PetModel', function () {

	beforeEach(module('PetModel'));

	it('variables are not defined', inject(function (petmodel) {
		expect(petmodel.animalTypes).toBeDefined();
		expect(petmodel.layout).toBeDefined();
		expect(petmodel.location).toBeDefined();
		expect(petmodel.pets).toBeDefined();
		expect(petmodel.shelters).toBeDefined();
	}));

	it('layout is not default to "list"', inject(function (petmodel) {
		expect(petmodel.layout.value).toEqual("list");
	}));

	function getAnimalType(animalTypes, name) {
		for (animal in animalTypes) {
			if (animalTypes[animal].name == name) return animalTypes[animal].value;
		}
		return undefined;
	}

	it('animal types has changed', inject(function (petmodel) {
		expect(petmodel.animalTypes.length).toEqual(9);
		expect(getAnimalType(petmodel.animalTypes, 'Dogs')).toEqual('dog');
		expect(getAnimalType(petmodel.animalTypes, 'Cats')).toEqual('cat');
		expect(getAnimalType(petmodel.animalTypes, 'Birds')).toEqual('bird');
		expect(getAnimalType(petmodel.animalTypes, 'Rabbits')).toEqual('rabbit');
		expect(getAnimalType(petmodel.animalTypes, 'Pigs')).toEqual('pig');
		expect(getAnimalType(petmodel.animalTypes, 'Farm')).toEqual('barnyard');
		expect(getAnimalType(petmodel.animalTypes, 'Horses')).toEqual('horse');
		expect(getAnimalType(petmodel.animalTypes, 'Reptiles')).toEqual('reptile');
		expect(getAnimalType(petmodel.animalTypes, 'Rodents')).toEqual('smallfurry');
		expect(getAnimalType(petmodel.animalTypes, '')).toEqual(undefined);
		expect(getAnimalType(petmodel.animalTypes, undefined)).toEqual(undefined);
	}));
});