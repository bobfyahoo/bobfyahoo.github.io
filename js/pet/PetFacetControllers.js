angular.module('PetFacetControllers', ['PetFacet'])

.controller('PetFacetController',
['$scope', 'petfacet',
function ($scope, petfacet) {

  $scope.orderby = petfacet.orderby;
  $scope.clearAll = petfacet.clearAll;
  $scope.clearSelections = petfacet.clearSelections;

} ])

.controller('AgesFilterController',
['$scope', 'petfacet',
function ($scope, petfacet) {
  $scope.name = 'ages';
  $scope.displayName = 'Age';

  $scope.facets = petfacet.facets.ages;

} ])

.controller('SizesFilterController',
['$scope', 'petfacet',
function ($scope, petfacet) {
  $scope.name = 'sizes';
  $scope.displayName = 'Size';

  $scope.facets = petfacet.facets.sizes;

  $scope.orderby = function (opt) {
    switch (opt.name) {
      case 'S': return 0; break;
      case 'M': return 1; break;
      case 'L': return 2; break;
      case 'XL': return 3; break;
      default: return 4;
    }
  };


} ])

.controller('LocationsFilterController',
['$scope', 'petfacet',
function ($scope, petfacet) {
  $scope.name = 'locations';
  $scope.displayName = 'Location';

  $scope.facets = petfacet.facets.locations;

} ])

.controller('GendersFilterController',
['$scope', 'petfacet',
function ($scope, petfacet) {
  $scope.name = 'genders';
  $scope.displayName = 'Genders';

  $scope.facets = petfacet.facets.genders;

} ])

.controller('BreedsFilterController',
['$scope', 'petfacet',
function ($scope, petfacet) {
  $scope.name = 'breeds';
  $scope.displayName = 'Breed';

  $scope.facets = petfacet.facets.breeds;

} ])

.controller('AttributesFilterController',
['$scope', 'petfacet',
function ($scope, petfacet) {
  $scope.name = 'attributes';
  $scope.displayName = 'Attributes';

  $scope.facets = petfacet.facets.attributes;

} ]);