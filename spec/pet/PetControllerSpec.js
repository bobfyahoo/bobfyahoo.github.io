describe('PetController', function () {
  var $rootScope, $controller;

  beforeEach(module('bfAngApp'));
  beforeEach(inject(function (_$controller_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
  }));

  describe('check basic initialization', function () {
    var $scope, mockObject = {};

    beforeEach(inject(function ($filter, $document, $timeout, $route, $routeParams, $location,
      $cookies, petfinder, imageArray, petmodel, petfacet) {
      $scope = $rootScope.$new();
      var controller = $controller('PetController', {
        $scope: $scope,
        $filter: $filter,
        $document: $document,
        $timeout: $timeout,
        $route: $route,
        $routeParams: $routeParams,
        $location: $location,
        $cookies: $cookies,
        petfinder: petfinder,
        ImageArray: imageArray,
        petmodel: petmodel,
        petfacet: petfacet
      });
    }));

    it('checks dependencies', function () {
      expect($scope.pets).toBeDefined();
      expect($scope.layout).toBeDefined();
      expect($scope.checkFilters).toBeDefined();
      expect($scope.$route).toBeDefined();
      expect($scope.$location).toBeDefined();
      expect($scope.$routeParams).toBeDefined();
    });

    it('check function definitions', function () {
      expect($scope.init).toBeDefined();
      expect($scope.getLayoutTemplate).toBeDefined();
      expect($scope.showModal).toBeDefined();
      expect($scope.hideModal).toBeDefined();
    });
  });

  describe('check functions', function () {
    var $scope, mockPetfacet;

    beforeEach(inject(function ($filter, $document, $timeout, $route, $routeParams, $location,
      $cookies, petfinder, imageArray, petmodel, petfacet) {
      $scope = $rootScope.$new();
      mockPetfacet = petfacet;
      // return value doesnt matter
      spyOn(mockPetfacet, 'buildFacets').and.returnValue(undefined);
      var controller = $controller('PetController', {
        $scope: $scope,
        $filter: $filter,
        $document: $document,
        $timeout: $timeout,
        $route: $route,
        $routeParams: $routeParams,
        $location: $location,
        $cookies: $cookies,
        petfinder: petfinder,
        ImageArray: imageArray,
        petmodel: petmodel,
        petfacet: mockPetfacet
      });
      $scope.init();
    }));

    it('checks init method', function () {
      expect(mockPetfacet.buildFacets).toHaveBeenCalledTimes(1);
      expect($scope.petImages).toBeDefined();
    });

    it('check getLayoutTemplate method', function () {
      expect($scope.getLayoutTemplate()).toContain("list");
      $scope.layout = 'map';
      expect($scope.getLayoutTemplate()).toContain("map");
      $scope.layout = 'thumb';
      expect($scope.getLayoutTemplate()).toContain("thumb");
    });

  });

});