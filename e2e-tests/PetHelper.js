module.exports = {
    loadMocks: function (zipcode) {
        return browser.executeAsyncScript(function () {
            var $injector = angular.injector(['ng', 'PetCache', 'PetModel']);
            var callback = arguments[arguments.length - 1];
            $injector.invoke(function ($http, petcache, petmodel) {
                console.log('b4');
                callback($http, petcache, petmodel);
                // $http.get('testing/petfinder-mock-pet.find.json').then(function (mock) {
                //     console.log('inside');
                //     // load the cache for each animal type
                //     var animals = petmodel.animalTypes;
                //     animals.forEach(e => {
                //         var key = zipcode + e.value;
                //         petcache.put(key, mock);
                //     });
                //     callback('done');
                // });
            });
        });
    },

    loadMocksSync: function (zipcode) {
        return browser.executeScript(function () {
            var zipcode = arguments[0];
            var $injector = angular.injector(['ng', 'PetCache', 'PetModel']);
            $injector.invoke(function ($http, petcache, petmodel) {
                console.log('b4' + zipcode);
//                return [$http, petcache, petmodel, arguments];
                $http.get('testing/petfinder-mock-pet.find.json').then(function (mock) {
                    console.log('inside' + mock.data);
                    // load the cache for each animal type
                    var animals = petmodel.animalTypes;
                    animals.forEach(e => {
                        var key = zipcode + e.value;
                        petcache.put(key, mock.data);
                    });
                    return 'done with ' + zipcode;
                });
            });
        }, zipcode);
    },

    useMocks: function (isTesting) {
        return browser.executeScript(function () {
            var isTesting = arguments[0];
            var $injector = angular.injector(['ng', 'PetFinder']);
            $injector.invoke(function ($http, petfinder) {
                console.log('b4' + isTesting);
                petfinder.testing(isTesting);
                return ("petfinder.isTesting=" + isTesting);
            });
        }, isTesting);
    }

};