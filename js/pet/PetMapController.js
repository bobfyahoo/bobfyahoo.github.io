angular.module('PetMapController', ['PetModel', 'GoogleApi', 'PetFacet'])

.controller('PetMapController',
['$scope', 'petfacet', 'googleApi', 'petmodel', '$timeout', '$window',
function ($scope, petfacet, googleApi, petmodel, $timeout, $window) {

  $scope.pets = petmodel.pets;

  $scope.buildTitle = function (loc) {
    return loc.name + ' (' + loc.count + ' pets)';
  };
  $scope.$parent.buildTitle = $scope.buildTitle;

} ])

.controller('ShelterMapController',
['$scope', 'petfacet', 'googleApi', 'petmodel', '$timeout', '$window',
function ($scope, petfacet, googleApi, petmodel, $timeout, $window) {

  $scope.shelters = petmodel.shelters;

} ])
.controller('PetMapBaseController',
['$scope', 'petfacet', 'googleApi', 'petmodel', '$timeout', '$window',
function ($scope, petfacet, googleApi, petmodel, $timeout, $window) {

  $scope.map = { 'value': undefined, 'markers': [], 'element': undefined, 'collection': undefined };

  var geocode = function (loc, successfn, errorfn) {
    googleApi.geocode(loc.name, function (response) {
      if (response && response.status == 200 &&
           response.data && response.data.results && response.data.results.length > 0) {
        successfn(response);
      } else {
        errorfn(response);
      }
    });
  };

  var geocodeLocations = function (locations) {
    for (var i = 0; i < locations.value.length; i++) {
      if (locations.value[i].center == undefined) {
        geocode(locations.value[i],
          addMarkerSuccessfn.bind(null, locations.value[i]), // successfn
          errorLog.bind(null, locations.value[i]));  //errorfn
      } else {
        addMarkerSuccessfn(locations.value[i]);
      }
    }
  };

  $scope.buildTitle = function (loc) {
    return loc.name;
  };

  var addMarkerSuccessfn = function (loc, response) {
    if (response) {
      loc.center = response.data.results[0].geometry.location;
    }
    var title = $scope.buildTitle(loc);
    $scope.map.markers.push(googleApi.addMarker($scope.map.value, loc.center, title));
  };

  var errorLog = function (loc, response) {
    console.log('geocoding failed loc=' + loc.name + ' resp' + JSON.stringify(response));
  };

  var addMarkers = function () {
    // TODO optimize if the location already exists, use the same markers
    if (!petfacet.built.value) {
      buildFacets();
    }
    geocodeLocations(petfacet.facets.locations);
  };

  var buildFacets = function () {
    // function is only used when the location is changed on the map layout page.
    for (var i = 0; i < $scope.map.collection.value.length; i++) {
      petfacet.buildFacets($scope.map.collection.value[i]);
    }
  };

  // use case: already on the map layout and enters a new location
  $scope.$watchCollection('map.collection', function (n, o) {
    // first time through, element will be undefined so it will not process twice
    if (n && o && n != o) {
      $scope.initMap($scope.map.element, $scope.map.collection);
    }
  });

  // initializes map with markers - invoked by directive below and by watchCollection when location changes.
  $scope.initMap = function (element, collection) {
    if (element) $scope.map.element = element;
    if (collection) $scope.map.collection = collection;

    if ($window.google == undefined || $window.google.maps == undefined)
      return;

    // default location
    var defaultCenter = { lat: 33.7, lng: -117.8 };

    // try to geocode the current location selected
    if (petmodel.location.name) {
      geocode(petmodel.location,
        function (response) { // successfn
          displayMap(element, collection, response.data.results[0].geometry.location);
        },
        function (response) { // errorfn
          displayMap(element, collection, defaultCenter);
        });
    }

  };

  // display the map and then add markers
  var displayMap = function (element, collection, center) {
    $scope.map.markers = [];
    $scope.map.element = element;
    $scope.map.collection = collection;
    $scope.map.value = googleApi.initMap(element, center);
    $timeout(addMarkers, 0);
  };

} ])

.directive('petMap', ['$window', '$document',
function ($window, $document) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      initFunction: '=initMap',
      collection: '=locations'
    },
    link: function (scope, element, attrs) {

      // if element changes, re-create the callback function with the current element.
      var callback = function () {
        scope.initFunction(element[0], scope.collection);
      };

      element.on('$destroy', function () {
        if (attrs.ngModel && scope.$parent[attrs.ngModel])
          scope.$parent[attrs.ngModel] = undefined;
      });

      // if first time - include google script and create callback function
      if ($window.google == undefined || $window.google.maps == undefined) {
        $window.petMapCallbackFunction = function () {
          callback();
        };

        var s = $document[0].createElement('script');
        s.async = "";
        s.defer = "";
        s.src = 'https://maps.googleapis.com/maps/api/js?callback=petMapCallbackFunction&key=' +
                             'AIzaSyDYt5MsXRh1CuQ410VY5xkOSeyijtBFPAE';
        $document[0].body.appendChild(s);
      } else {
        callback();
      }
    }
  };

} ]);