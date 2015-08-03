(function () {
    'use strict';
    var serviceId = 'asyncService';

    angular.module('angularKickstartServices', []).service(serviceId,
        ['$http', '$q', function asyncService($http, $q) {
            
            var factory = {
                //properties
                retrievedData: [],
                preparedData: [],
                getHeroText : getHeroText
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

            function getHeroText(APIHOST) {

                /*$http.get(APIHOST + '/api/reading')
                //$http.get('https://bedroomtemp.azurewebsites.net/api/reading')
                    .success(function(data) {
                        console.log(JSON.stringify(data));
                    })
                    .error(function(status, data, error) {
                          console.log("Error: " + error);
                          //console.log("Status: " + status);
                          //console.log("Error: " + data);
                    })
                    .finally(function() {
                        console.log("Finished");
                    });*/

                sendRequest.async('https://bedroomtemp.azurewebsites.net/api/reading').then(function(d) {

                   /* console.log("Result: " + JSON.stringify(d));
                    angular.forEach(d, function (value, key) {

                    });*/
                    factory.retrievedData = d;

                    console.log(JSON.stringify(factory.retrievedData));
                });

               /* factory.retrievedData = {HeroHeader:"Header", HeroText:"ssdsd"};
                factory.retrievedData.pageHeader = "About this App";
                factory.retrievedData.pageText = "This is a totally new page!";*/
                //console.log("at return: " + JSON.stringify(factory.retrievedData));
            }
            return factory;
        }]);
})();