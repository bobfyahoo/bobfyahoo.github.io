angular.module('PetFacet', [])
.factory('petfacet', [function () {

  var built = { 'value': false };

  var facets = {
    'ages': { 'value': [] },
    'sizes': { 'value': [] },
    'genders': { 'value': [] },
    'locations': { 'value': [] },
    'breeds': { 'value': [] },
    'attributes': { 'value': [] }
  };

  var ids = { 'seen': [] };

  var initialize = function () {
    built.value = false;
    facets.ages.value = [];
    facets.sizes.value = [];
    facets.locations.value = [];
    facets.genders.value = [];
    facets.breeds.value = [];
    facets.attributes.value = [];
    ids.seen = {};
  };

  // default orderby function that can be overridden by facet controllers
  var orderby = function (arrayItem) {
    return arrayItem.name ? arrayItem.name : arrayItem;
  };

  // used by facet controllers
  var clearSelections = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i].selected = null;
    }
  };

  var clearAll = function () {
    for (var i in facets) {
      for (var j = 0; j < facets[i].value.length; j++) {
        facets[i].value[j].selected = null;
      }
    }
  };

  var buildFacets = function (item) {
    if (item.contact)
      buildPetFacets(item);
    else
      buildShelterFacets(item);
  };

  var buildShelterFacets = function (shelter) {
    built.value = true;

    if (ids.seen[shelter.id] == true) {
      // already seen this id
      return;
    } else {
      ids.seen[shelter.id] = true;
    }

    var shelterAddress = buildShelterAddress(shelter);
    if (shelterAddress) {
      buildFilter(facets.locations.value, shelterAddress);
    }

  };

  var buildShelterAddress = function (shelter) {
    var address = [];
    if (shelter.address1) address.push(shelter.address1);
    if (shelter.city) address.push(shelter.city + ', ');
    if (shelter.state) address.push(shelter.state);
    if (shelter.zip) address.push(shelter.zip);
    return address.join(" ");
  };

  var buildPetFacets = function (pet) {
    built.value = true;

    if (ids.seen[pet.id] == true) {
      // already seen this id
      return;
    } else {
      ids.seen[pet.id] = true;
    }

    if (pet.age) {
      buildFilter(facets.ages.value, pet.age);
    }

    if (pet.size) {
      buildFilter(facets.sizes.value, pet.size);
    }

    if (pet.contact.address.postcode) {
      buildFilter(facets.locations.value, pet.contact.address.postcode);
    }

    if (pet.gender) {
      buildFilter(facets.genders.value, pet.gender);
    }

    if (pet.breeds && pet.breeds.primary) {
      buildFilter(facets.breeds.value, pet.breeds.primary);
      if (pet.breeds.secondary) {
        buildFilter(facets.breeds.value, pet.breeds.secondary);
      }
      if (pet.breeds.mixed) {
        buildFilter(facets.breeds.value, 'mixed');
      }
    }

    if (pet.attributes) {
      for (var attr in pet.attributes) {
        if (pet.attributes[attr]) {
          buildFilter(facets.attributes.value, attr);
        }
      }
    }
  };

  var createId = function (name) {
    return 'id' + name.replace(/[\W ,]/g, '_');
  };

  var buildFilter = function (array, name) {
    var id = createId(name);
    if (typeof array[id] === 'undefined') {
      array[id] = array.length;
      // change selected to be undefined instead of null?
      array.push({ 'id': id, 'index': array.length, 'name': name, count: 0, selected: null });
    }
    var index = array[id];
    array[index].count++;
  };

  var checkFilters = function (pet) {
    var age = checkFilter(pet.age, facets.ages.value);
    if (age)
      return true;

    var size = checkFilter(pet.size, facets.sizes.value);
    if (size)
      return true;

    var loc = checkFilter(pet.contact.address.postcode, facets.locations.value);
    if (loc)
      return true;

    var gender = checkFilter(pet.gender, facets.genders.value);
    if (gender)
      return true;

    var breed = checkFilter(pet.breeds.primary, facets.breeds.value) || checkFilter(pet.breeds.secondary, facets.breeds.value);
    if (breed)
      return true;

    var opt = checkFilter(pet.attributes, facets.attributes.value);
    if (opt)
      return true;

    // if all are undefined, no filters were specified - return true;
    // if any is true, one of the above checks would have stopped execution
    // so either the result is false or undefined at this point - if none are false - display the pet.
    return age !== false && size !== false && loc !== false && gender !== false && breed !== false && opt !== false;
  };

  var checkFilter = function (petValue, array) {
    var filter;
    var value;
    var index;
    for (var i = 0; i < array.length; i++) {
      // if one is selected then apply this filter criteria
      if (array[i].selected === true) {
        filter = true;
      }
    }
    if (filter) {
      if (petValue && typeof petValue == 'string') {
        value = createId(petValue);
        index = array[value];
        if (array[index].selected) {
          return true;
        }
      } else {
        for (var j in petValue) {
          if (petValue[j]) {
            value = createId(j);
            index = array[value];
            if (array[index].selected) {
              return true;
            }
          }
        }
      }
      return false;
    }

    // filter can only be 'undefined' here which means no filter selections for this facet, 
    // otherwise the filter value is returned above
    return filter;
  }

  return {
    facets: facets,
    checkFilters: checkFilters,
    buildFacets: buildFacets,
    clearSelections: clearSelections,
    clearAll: clearAll,
    orderby: orderby,
    initialize: initialize,
    built: built
  };

} ]);