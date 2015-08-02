(function () {
    'use strict';
    var controllerId = 'HomeController';
    angular.module('angularstrapControllers', []).controller('HomeController', ["$scope", "$http", "$window", "$q", "asyncService",

        /**
         * Primary entry point for application
         * @param {array} [scope] The global scope for Angular
         * @param {object} [http] Http object (not in use)
         * @param {object} [q] Queing object
         * @param {object} [asyncService] our async service for http calls
         * @param {string} [APIHOST] constant for pointing to REST server
         *
         */
            function HomeController($scope, $http, $window, $q, asyncService, APIHOST) {
            console.log("we got here!");
            var vm = this;

            //services
            vm.angularstrapService = asyncService;

            //properties
            vm.APIHost = APIHOST;

            // get our hero text
            asyncService.getHeroText(APIHOST);

            vm.pageHeading = asyncService.retrievedData.pageHeader;

            vm.pageText = asyncService.retrievedData.pageText;

            function reloadPage() {
                $window.location.reload();

            }

            return vm;
        }
    ]);
})();