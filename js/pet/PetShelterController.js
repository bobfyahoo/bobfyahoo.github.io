angular.module('PetShelterController', ['ngRoute', 'ngCookies', 'PetFinder', 'ImageArray', 'PetModel'])

.controller('PetShelterController',
['$scope', '$filter', '$document', '$timeout', '$route', '$routeParams', '$location', '$cookies', 'petfinder', 'imageArray', 'petmodel',

function ($scope, $filter, $document, $timeout, $route, $routeParams, $location, $cookies, petfinder,
 ImageArray, petmodel) {

  $scope.shelters = petmodel.shelters;

  $scope.find = function () {
    if (!$scope.location || $scope.location.length < 5) return;

    $scope.showspinner = true;
    var callback = function (data) {
      if (!data || !data.petfinder || !data.petfinder.shelters || !data.petfinder.shelters.shelter) {
        try {
          $scope.message = data.petfinder.header.status.message.$t;
        } catch (e) {
          $scope.message = "No pets found in that area";
        }
        petmodel.shelters.value = [];
      }
      else {
        $scope.message = undefined;
        petmodel.shelters.value = data.petfinder.shelters.shelter;
      }
      // use timeout because cached hits are too fast and this will wait until content is loaded
      $timeout(function () {
        $scope.showspinner = false;
        $scope.initTooltips();
      }, 0);
    };
    petfinder.findShelters({ 'location': $scope.location }, callback);
  };

  $scope.find();

} ]);