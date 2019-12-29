angular.module('PetCache', [])
  .factory('shelters', ['$cacheFactory', function ($cacheFactory) {
    return $cacheFactory('shelters');
  } ])  
  .factory('petcache', ['$cacheFactory', function ($cacheFactory) {
    return $cacheFactory('petcache');
  } ]);