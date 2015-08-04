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
            vm.HourAvg = "";
            vm.DayAvg = "";


            // get our hero text
            asyncService.getCurrentTemp(APIHOST);
            asyncService.getLastHour(APIHOST);
            asyncService.getLastDay(APIHOST);

            $timeout( function() {
                //console.log("Temp: " + JSON.stringify(asyncService.retrievedData));
                //console.log("Showing: " + asyncService.retrievedData[0].ReadingTime);
                //console.log("Showing: " + JSON.stringify(asyncService.lastHour));


                vm.CurrentTemp = asyncService.retrievedData[0].ReadingTemp;
                vm.CurrentTime = asyncService.retrievedData[0].ReadingTime;
                //vm.HourAvg = asyncService.lastHour;


                // calculate hour average
                var hourtotal = 0;
                angular.forEach(asyncService.lastHour, function(key, value){
                    hourtotal = hourtotal + key;
                }, asyncService.lastHour);

                vm.HourAvg = (hourtotal / 60);

                // calculate day average
                var daytotal = 0;
                angular.forEach(asyncService.lastDay, function(key, value){
                    daytotal = daytotal + key
                }, asyncService.lastDay);

                vm.HourAvg = (hourtotal / 60);
                vm.DayAvg = (daytotal / 1440);

            }, 1000);

            function reloadPage() {
                $window.location.reload();
            }

            return vm;
        }
    ]);
})();