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

            // get our hero text
            asyncService.getHeroText(APIHOST);


            $timeout( function() {
                console.log("Here");
                console.log("Temp: " + JSON.stringify(asyncService.retrievedData));

                console.log("Showing: " + asyncService.retrievedData[0].ReadingTime);

                vm.CurrentTemp = asyncService.retrievedData[0].ReadingTemp;
                vm.CurrentTime = asyncService.retrievedData[0].ReadingTime;


            }, 1000);


            function reloadPage() {
                $window.location.reload();
            }

            return vm;
        }
    ]);
})();