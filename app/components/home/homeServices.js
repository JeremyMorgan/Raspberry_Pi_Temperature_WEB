(function () {
    'use strict';
    var serviceId = 'asyncService';

    angular.module('angularKickstartServices', []).service(serviceId,
        ['$http', '$q', function asyncService($http, $q) {
            
            var factory = {
                //properties
                retrievedData: [],
                preparedData: [],
                getCurrentTemp : getCurrentTemp
            };

            var sendRequest = {
                async: function (url) {
                    var promise = $http.get(url).then(function (response) {
                        // The then function here is an opportunity to modify the response
                        // store the response status and text
                        //factory.retrievedData = response.data;
                        //console.log(JSON.stringify(response.data));
                        //tmpData.requestStatusText = response.statusText;
                        // The return value gets picked up by the then in the controller.
                        return response.data;
                    });
                    return promise;
                }
            }

            function getCurrentTemp(APIHOST) {
                sendRequest.async('https://bedroomtemp.azurewebsites.net/api/reading').then(function(d) {
                    factory.retrievedData = d;
                    //console.log(JSON.stringify(factory.retrievedData));
                });
            }
            return factory;
        }]);
})();