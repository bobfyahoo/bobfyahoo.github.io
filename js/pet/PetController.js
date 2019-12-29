angular.module('PetController', ['ngRoute', 'ngCookies', 'PetFinder', 'ImageArray', 'PetModel', 'GoogleApi', 'PetFacet'])

.controller('PetSearchController',
['$scope', '$route', '$routeParams', '$location', '$cookies', '$timeout', '$window', 
'petfinder', 'petmodel', 'petfacet', 'googleApi',
function ($scope, $route, $routeParams, $location, $cookies, $timeout, $window, 
petfinder, petmodel, petfacet, googleApi) {

  /*     pet search    */

  $scope.locationCookiename = 'location';
  //$scope.location = $cookies.get($scope.locationCookiename);
  var updateCookie = function () {
    //$cookies.put($scope.locationCookiename, $scope.location);
  };

  var parseGeocodingResponse = function (results) {
    for (var i = 0; i < results.length; i++) {
      for (var j = 0; j < results[i].address_components.length; j++) {
        if (results[i].address_components[j].types.indexOf('postal_code') > -1) {
          return results[i].address_components[j].short_name;
        }
      }
    }
  };

  if (!$scope.location) {
    $window.navigator.geolocation && $window.navigator.geolocation.getCurrentPosition(function (position) {
      googleApi.reverseGeocode({ 'lat': position.coords.latitude, 'lng': position.coords.longitude },
            function (response) {
              if (response && response.status == 200 &&
               response.data && response.data.results && response.data.results.length > 0) {
                $scope.location = parseGeocodingResponse(response.data.results);
              }
            });
    });
  }

  $scope.$watch('location', function (n, o) {
    if (n) {
      updateCookie(n);
      petmodel.location.name = n;
    }
  });

  $scope.animal = $routeParams.animal;
  $scope.animalSelector = petmodel.animalTypes;

  $scope.message = undefined;

  $scope.showspinner = false;
  $scope.layout = petmodel.layout;

  $scope.find = function () {
    if (!$scope.location || $scope.location.length < 5 || !$scope.animal || $scope.animal.length == 0) return;

    $scope.showspinner = true;
    var callback = function (data) {
      if (!data || !data.animals) {
        try {
          var dataDisplay = JSON.stringify(data); 
          console.log(dataDisplay);
          $scope.message = "request failed: " + dataDisplay;
        } catch (e) {
          $scope.message = "No pets found in that area";
        }
        petmodel.pets.value = [];
      } else {
        $scope.message = undefined;
        petfacet.initialize();
        petmodel.pets.value = data.animals;
        $scope.scrollTo('searchResults');
      }
      // use timeout because cached hits are too fast and this will wait until content is loaded
      $timeout(function () {
        $scope.showspinner = false;
        $scope.initTooltips();
      }, 0);
    };
    petfinder.findPets({ 'location': $scope.location, 'animal': $scope.animal }, callback);
  };

  /*   initialization    */
  $scope.find();
  $('#navbar').removeClass('in');

} ])

.controller('PetController',
['$scope', '$filter', '$document', '$timeout', '$route', '$routeParams', '$location', '$cookies', 'petfinder', 'imageArray', 'petmodel', 'petfacet',
function ($scope, $filter, $document, $timeout, $route, $routeParams, $location, $cookies, petfinder, ImageArray, petmodel, petfacet) {

  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;

  /*    filter    */

  $scope.adoptableStatus = { "status": "adoptable" };
  $scope.pets = petmodel.pets;
  $scope.layout = petmodel.layout;
  $scope.getLayoutTemplate = function () {
    switch ($scope.layout) {
      case 'thumb': return 'html/pets-layout-thumb.html'; break;
      case 'map': return 'html/pets-layout-map.html'; break;
      default: return 'html/pets-layout-list.html';
    }
  };

  // default orderby function that can be overridden by facet controllers
  $scope.checkFilters = petfacet.checkFilters;

  /*    initialization  called by layout html files in first data-repeat  */
  $scope.init = function (pet) {
    petfacet.buildFacets(pet);
    $scope.petImages = new ImageArray();
  }

  $scope.showModal = function (pet) {
    if (!pet) return;

    $scope.modal = new ImageArray();
    $scope.modal.petIndex = 0;
    var bigphotos = $filter('photos')(pet.media.photos.photo, 'pn');
    for (var p in bigphotos) {
      // always using petIndex == 0 because there is only one modal window
      $scope.modal.init(pet, 0, bigphotos[p]);
    }
    $('#modalWindow').modal('show');
  };

  $scope.hideModal = function () {
    $('#modalWindow').modal('hide');
  };

} ]);