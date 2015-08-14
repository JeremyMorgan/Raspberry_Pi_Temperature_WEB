(function () {
    'use strict';
    var serviceId = 'asyncService';

    angular.module('angularKickstartServices', []).service(serviceId,
        ['$http', '$q', function asyncService($http, $q) {
            
            var factory = {
                //properties
                retrievedData: [],
                preparedData: [],
                lastHour: [],
                lastDay: [],
                lastDayRaw: [],
                lastHourHumidity: [],
                getCurrentTemp : getCurrentTemp,
                getLastHour : getLastHour,
                getLastDay : getLastDay,
            };

            var sendRequest = {
                async: function (url) {
                    var promise = $http.get(url).then(function (response) {
                        // The then function here is an opportunity to modify the response
                        // store the response status and text
                        //factory.retrievedData = response.data;
                        //console.log("Response: " + JSON.stringify(response.data));
                        //tmpData.requestStatusText = response.statusText;
                        // The return value gets picked up by the then in the controller.
                        return response.data;
                    },function(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        console.log("Error:  " + JSON.stringify(response));
                    });
                    return promise;
                }
            }

            function getCurrentTemp(APIHOST) {
                sendRequest.async('https://bedroomtemp.azurewebsites.net/api/status').then( function(d) {
                    factory.retrievedData = d;
                });
            }

            function getLastHour(APIHOST) {
                sendRequest.async('https://bedroomtemp.azurewebsites.net/api/status?count=60&sortorder=DESC').then( function(d) {
                    angular.forEach(d, function(key, value){
                        factory.lastHour.push(key.TempFahrenheit);
                        factory.lastHourHumidity.push(key.Humidity);
                    }, d);
                });
            }

            function getLastDay(APIHOST) {
                sendRequest.async('https://bedroomtemp.azurewebsites.net/api/status?count=1440&sortorder=DESC').then( function(d) {
                    //factory.lastDayRaw.push(d);
                    angular.forEach(d, function(key, value){
                        factory.lastDay.push(key.TempFahrenheit);
                    }, d);
                });
            }

            return factory;
        }]);
})();