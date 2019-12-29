var google = { maps: { 
	Map: function (element, config) { 
		this.element = element;
		this.config = config;
	}, 
	Marker: function (config) { 
		this.config = config;
	} 
}}

describe('GoogleApi', function () {

	beforeEach(module('GoogleApi'));

	var result = false;
	var success = function (response) {
		result = response.data.a;
	};

	beforeEach(function () {
		result = false;
	});

	it('is not defined', inject(function (googleApi) {
		expect(googleApi).toBeDefined();
		expect(googleApi.initMap).toBeDefined();
		expect(googleApi.addMarker).toBeDefined();
		expect(googleApi.geocode).toBeDefined();
		expect(googleApi.reverseGeocode).toBeDefined();
	}));

	it('geocode returns a bad result', inject(function (googleApi, $httpBackend) {
		$httpBackend.expectGET(/geocode.json.*address=/).respond({ a: true });
		googleApi.geocode({ location: 'a' }, success);
		$httpBackend.flush();
		expect(result).toBe(true);
	}));

	it('reverseGeocode returns a bad result', inject(function (googleApi, $httpBackend) {
		$httpBackend.expectGET(/geocode.json.*latlng=/).respond({ a: true });
		googleApi.reverseGeocode({ lat: 'a', lng: 'b' }, success);
		$httpBackend.flush();
		expect(result).toBe(true);
	}));

	it('initMap returns a bad result', inject(function (googleApi) {
		var map = googleApi.initMap({}, { lat: 'a', lng: 'b' });
		expect(map.element).toBeDefined();
		expect(map.config).toBeDefined();
	}));

	it('addMarker returns a bad result', inject(function (googleApi) {
		var marker = googleApi.addMarker({});
		expect(marker.config).toBeDefined();
	}));

});