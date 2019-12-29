angular.module('PetFilter', [])

.filter('checkmark', function () {
  // adds a checkmark or X for true/false, respectively
  // from the Angular tutorial
  return function (input) {
    return input ? '\u2713' : '\u2718';
  };
})

.filter('address', function () {
  return function (contactGroup) {
    var contact = contactGroup && contactGroup.address ? contactGroup.address : undefined;
    return contact && (contact.city.$t + ', ' + contact.state.$t + ' ' + contact.zip.$t);
  };
})

.filter('description', function () {
  return function (description) {
    if (!description) return description;
    var d = description;
    return d && d.length && d.length > 0 ? (d.substring(0, 500) + (d.length > 500 ? ' READ MORE...' : '')) : null;
  };
})

.filter('photos', function () {
  return function (photos, size) {
    var result = [];
    for (var p in photos) {
      if (photos[p]['@size'] == size) {
        result.push(photos[p]);
      }
    }
    return result;
  };
})

.filter('shelters', function () {
  return function (input) {
    var value = input;
    return value;
  };

}).filter('sizes', function () {
  var sizes = {
    "S": "Small",
    "M": "Medium",
    "L": "Large",
    "XL": "Extra-Large"
  };
  return function (input) {
    var display = sizes[input] || input;
    return display + '-sized';
  };
})

.filter('sexes', function () {
  var sexes = {
    "M": "Male",
    "F": "Female"
  };
  return function (input) {
    return sexes[input] || input;
  };
})

.filter('status', function () {
  var status = {
    "A": "Adoptable",
    "H": "On Hold",
    "P": "Pending",
    "X": "Adopted"
  };
  return function (input) {
    return status[input];
  };
})

.filter('breeds', function () {
  return function (input) {
    if (!input) return '';
    if (input.mixed) return 'Mixed: ' + input.primary + (input.secondary ? ' & ' + input.secondary : '');
    if (input.primary) return input.primary;
    return 'unknown';
  };
})

.filter('attributes', function () {
  var attributes = {
    "spayed_neutered": "Spayed / Neutered",
    "declawed": "No Claws",
    "shots_current": "Has Current Shots",
    "house_broken": "House Broken",
    "house_trained": "House Trained",
    "special_needs": "Has Special Needs"
  };
  var safeGet = function (attr) {    
    return attributes[attr] ? attributes[attr] : attr;
  };
  return function (input) {
    if (!input) return '';

    var result = '';
    for (type in input) {
      if (input[type] === true) { 
        result += (result.length > 0 ? ', ' : '') + safeGet(type);
      }
    }
    return result;
  };
})

.filter('environment', function () {
  var attributes = {
    "cats.true": "OK With Cats",
    "cats.false": "Not Good With Cats",
    "dogs.true": "OK With Dogs",
    "dogs.false": "Not Good With Dogs",
    "children.true": "OK With Kids",
    "children.false": "Not Good With Kids"
  };
  var safeGet = function (attr, hasAttr) {
    var value = attr + '.' + hasAttr;
    return attributes[value] ? attributes[value] : attr;
  };
  return function (input) {
    if (!input) return '';

    var result = '';
    for (type in input) {
      if (input[type]) {
        result += (result.length > 0 ? ', ' : '') + safeGet(type, input[type]);
      }
    }
    return result;
  };
})

.filter('arrayjoin', function () {
  return function (input) {
    if (typeof(input) === 'array' && input.length > 0) return input.join(", ");
    return '';
  };
})
;