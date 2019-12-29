/* Author: Bob Ferrero
Index is the header and navigation portion of the application
*/

angular.module('IndexController', ['ngRoute', 'PetModel'])

.controller('Index',
['$scope', '$window', '$route', '$routeParams', '$location', '$anchorScroll', '$cookies', 'petmodel',
function ($scope, $window, $route, $routeParams, $location, $anchorScroll, $cookies, petmodel) {

  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;

  $scope.petmenu = petmodel.animalTypes;

  $scope.initTooltips = function () {
    $('[data-toggle="tooltip"]').tooltip();
  };

  $scope.scrollTo = function (anchor) {
    $location.hash(anchor);
    $anchorScroll();
  };

  $scope.removeAllCookies = function() {
    var cookies = $cookies.getAll();
    for (var c in cookies) {
      $cookies.remove(c);
    }
  };

  $scope.removeAllCookies();

} ])

 .config(function ($routeProvider, $locationProvider) {
   $routeProvider
   .when('/pets/shelters', {
     templateUrl: 'html/shelters.html',
     controller: 'PetShelterController',
     resolve: {
       // from example code: 1 second delay
       /*
       delay: function ($q, $timeout) {
       var delay = $q.defer();
       $timeout(delay.resolve, 1000);
       return delay.promise;
       } */
     }
   })
   .when('/pets/:animal?', {
     templateUrl: 'html/pets.html',
     controller: 'PetController',
     resolve: {
       // from example code: 1 second delay
       /*
       delay: function ($q, $timeout) {
       var delay = $q.defer();
       $timeout(delay.resolve, 1000);
       return delay.promise;
       } */
     }
   })
   .when('/android/:category?', {
     templateUrl: function (routeParams) {
       //return 'html/android-' + routeParams.category + '.html';
       return 'html/terms-and-privacy.html'
     },
     resolve: {
       // from example code: 1 second delay
       /*
       delay: function ($q, $timeout) {
       var delay = $q.defer();
       $timeout(delay.resolve, 1000);
       return delay.promise;
       } */
     }
   })
   .when('/terms?', {
     templateUrl: function (routeParams) {
       return 'html/terms-and-privacy.html';
     },
     resolve: {
       // from example code: 1 second delay
       /*
       delay: function ($q, $timeout) {
       var delay = $q.defer();
       $timeout(delay.resolve, 1000);
       return delay.promise;
       } */
     }
   })
   .when('/', {
     templateUrl: 'html/mobile-apps.html'
   }).otherwise('/');

   // this is hacky but it allows page to reload
   // must use #!/ in the URLs of any anchor tag that causes navigation
   $locationProvider.html5Mode(true);
 });

