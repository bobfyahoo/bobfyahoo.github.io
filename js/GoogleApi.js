angular.module('GoogleApi', [])
  .factory('googleApi', ['$http', function ($http) {

    var constants = { test: false,
            url: '//us-central1-igneous-future-108923.cloudfunctions.net/geocode',
            params: {
              format: 'json'
            }
    };

    var initMap = function (element, center) {
      // Create a map object and specify the DOM element for display.
      return new google.maps.Map(element, {
        center: center,
        scrollwheel: true,
        zoom: 10
      });
    };

    var addMarker = function (map, position, title) {
      return new google.maps.Marker({
        position: position,
        map: map,
        title: title
      })
    };

    var geocode = function (location, success, error) {
      if (typeof success != 'function') success(null);

      var params = angular.extend({}, constants.params, { address: location });
      var config = { headers: { 'Content-Type': undefined }, params: params };
      $http.jsonp(constants.url, { 'params': params }).then(success);
    };

    var reverseGeocode = function (center, success, error) {
      if (typeof success != 'function') success(null);

      var params = angular.extend({}, constants.params, { latlng: center.lat + ',' + center.lng });
      var config = { headers: { 'Content-Type': undefined }, params: params };
      $http.jsonp(constants.url, { 'params': params }).then(success);
    };

    return {
      initMap: initMap,
      addMarker: addMarker,
      geocode: geocode,
      reverseGeocode: reverseGeocode
    };

  }]);
