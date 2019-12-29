var $ = function(){
    return {
      removeClass:function(){return;}
    };
  };

  describe('IndexController', function () {
    var $rootScope, $controller;
  
    beforeEach(module('bfAngApp'));
    beforeEach(inject(function (_$controller_, _$rootScope_) {
      $rootScope = _$rootScope_;
      $controller = _$controller_;
    }));

  describe('check IndexController functions', function () {
    var $scope, cookies;

    beforeEach(inject(function ($window, $route, $routeParams, $location,
      $anchorScroll, petmodel) {
      $scope = $rootScope.$new();

      var controller = $controller('Index', {
        $scope: $scope,
        $window: $window,
        $route: $route,
        $routeParams: $routeParams,
        $location: $location,
        // $cookies: $cookies,
        $anchorScroll: $anchorScroll,
        petmodel: petmodel
      });
    }));

    it('check removeAllCookies method', function () {
      expect($scope.removeAllCookies).not.toThrow();
    });
  });

});