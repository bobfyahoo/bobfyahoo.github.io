angular.module('bfAngApp', 

['ngRoute', 'ngCookies', 'ngSanitize', 'IndexController', 'PetController', 'PetFacetControllers', 'PetMapController',
    'PetFilter', 'PetCache', 'PetFinder', 'PetModel', 'PetShelterController', 'PetFacet', 'GoogleApi'])

.config(['$compileProvider', '$sceDelegateProvider', function ($compileProvider, $sceDelegateProvider) {
  $compileProvider.debugInfoEnabled(true);

  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from jpets
    '**//jpets.herokuapp.com/rhc/api/v1/**',
    // allow google functions
    '**//us-central1-igneous-future-108923.cloudfunctions.net/**'
  ]);
}]);