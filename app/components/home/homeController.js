(function () {
    'use strict';
    var controllerId = 'HomeController';
    angular.module('angularKickstartControllers', []).controller(controllerId, ["$scope", "$http", "$window", "$q", "asyncService", "$timeout", "APIHOST",

        /**
         * Primary entry point for application
         * @param {array} [scope] The global scope for Angular
         * @param {object} [http] Http object (not in use)
         * @param {object} [q] Queing object
         * @param {object} [asyncService] our async service for http calls
         * @param {string} [APIHOST] constant for pointing to REST server
         *
         */
          function HomeController($scope, $http, $window, $q, asyncService, $timeout, APIHOST) {

            var vm = this;

            //services
            vm.angularKickstartService = asyncService;

            //properties
            vm.APIHost = APIHOST;
            vm.CurrentTemp = "Fetching..";
            vm.CurrentTime = "";
            vm.CurrentTempCelcius = "";
            vm.CurrentHumidity = ""
            vm.HourAvg = "";
            vm.DayAvg = "";
            vm.loaded = false;
            vm.lastDayRaw = asyncService.lastDayRaw;
            vm.dayHigh = 0;
            vm.dayLow = 0;

            // get our hero text
            asyncService.getCurrentTemp(APIHOST);
            asyncService.getLastHour(APIHOST);
            asyncService.getLastDay(APIHOST);

            $timeout( function() {
                console.log("Temp: " + JSON.stringify(asyncService.retrievedData));
                //console.log("Showing: " + asyncService.retrievedData[0].TimeStamp);
                //console.log("Showing: " + JSON.stringify(asyncService.lastHour));

                vm.CurrentTemp = asyncService.retrievedData[0].TempFahrenheit;
                vm.CurrentTime = asyncService.retrievedData[0].TimeStamp;
                vm.CurrentTempCelcius = asyncService.retrievedData[0].TempCelcius;
                vm.CurrentHumidity = asyncService.retrievedData[0].Humidity;

                //vm.HourAvg = asyncService.lastHour;


                // calculate hour average
                var hourtotal = 0;
                var hourstart = asyncService.lastHour[0];
                var hourend = asyncService.lastHour[59];

                angular.forEach(asyncService.lastHour, function(key, value){
                    hourtotal = hourtotal + key;
                }, asyncService.lastHour);

                vm.HourAvg = (hourtotal / 60);

                // calculate day average
                var daytotal = 0;
                var daystart = asyncService.lastDay[0];
                var dayend = asyncService.lastDay[1339];

                angular.forEach(asyncService.lastDay, function(key, value){
                    daytotal = daytotal + key;
                }, asyncService.lastDay);

                // create averages
                vm.HourAvg = (hourtotal / 60);
                vm.DayAvg = (daytotal / 1440);

                // calculate day high
                angular.forEach(asyncService.lastDay, function(key, value){
                    if (key > vm.dayHigh){
                        vm.dayHigh = key;
                    }
                }, asyncService.lastDay);

                // calculate day low
                // TODO: make this since midnight instead of last 24 hours
                vm.dayLow = vm.dayHigh;
                angular.forEach(asyncService.lastDay, function(key, value){

                    if (key <= vm.dayLow){
                        vm.dayLow = key;
                    }
                    //console.log("Day low is " + vm.dayLow);
                }, asyncService.lastDay);

                if (hourstart >= hourend){
                    // trending colder
                    vm.hourcolder = true;
                }else {
                    // trending hotter
                    vm.hourhotter = true;
                }
                if (daystart >= dayend){
                    // trending colder
                    vm.daycolder = true;
                }else {
                    // trending hotter
                    vm.dayhotter = true;
                }
                vm.loaded = true;
            }, 1000);

            function reloadPage() {
                $window.location.reload();
            }
            return vm;
        }
    ]);
})();