angular.module('PetModel', [])
.factory('petmodel', [function () {

  var animalTypes = [
        { 'name': 'Dogs', 'value': 'dog' }, { 'name': 'Cats', 'value': 'cat' },
        { 'name': 'Birds', 'value': 'bird' }, { 'name': 'Rabbits', 'value': 'rabbit' },
        { 'name': 'Pigs', 'value': 'pig' }, { 'name': 'Farm', 'value': 'barnyard' },
        { 'name': 'Horses', 'value': 'horse' },
        { 'name': 'Reptiles', 'value': 'reptile' }, { 'name': 'Rodents', 'value': 'smallfurry' }
    ];

  var layout = { 'value': 'list' };

  var location = { 'name': undefined };
  
  var pets = { 'value': undefined };
  
  var shelters = { 'value': undefined };


  return {
    animalTypes: animalTypes,
    layout: layout,
    location: location,
    pets: pets,
    shelters: shelters
  };

} ]);