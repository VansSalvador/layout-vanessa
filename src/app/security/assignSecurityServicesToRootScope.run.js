/* global angular: false */

(function (angular) {

    function assignSecurityServicesToRootScope($rootScope, authenticationService, authorizationService) {
        $rootScope.authenticationService = authenticationService;
        $rootScope.authorizationService = authorizationService;
    }
    assignSecurityServicesToRootScope.$inject = ['$rootScope', 'authenticationService', 'authorizationService'];

    // Export
    angular
        .module('appEpicom')
        .run(assignSecurityServicesToRootScope);

})(angular);
