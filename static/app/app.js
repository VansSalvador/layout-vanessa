var app = angular.module('appEpicom', ['ngRoute', 'ui.router']);

/**
 * Configure the Routes
 */
app
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
        // Home
            .when('/', {
                templateUrl: 'app/home/home.tmpl.html',
                controller: 'PageController',
                pageTitle: 'Home'
            })
            // Pages 
            .when('/about', {
                templateUrl: 'app/about/about.tmpl.html',
                controller: 'PageController',
                pageTitle: 'About'
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
    .config(function($urlRouterProvider) {
        //any url that doesn't exist in routes redirect to '/'
        $urlRouterProvider.otherwise('/');
    });