/* global angular: false */

(function (angular) {

    var app = angular
        .module('appEpicom', [
            'templates-appEpicom',
            'ui.router',
            'ui.grid',
            'ui.grid.pagination',
            'ngHttpStatus',
            'http-auth-interceptor',
            'angularModalService'
        ]);

})(angular);
