/**
 * Load modules for application
 */
var angularstrapApp = angular.module('angularstrapApp', ['ui.router', 'angularstrapControllers', 'angularstrapServices']);

// set our API host
angularstrapApp.constant('APIHOST', 'http://localhost:12017');

angularstrapApp.controller('HomeController', function( HomeController ){});