/* global angular: false */

(function (angular) {

    function checkAccessOnStateChange($rootScope, $injector, authenticationService) {

        // Listen for state changes when using ui-router
        $rootScope.$on('$stateChangeStart', function ($injector, event, toState, toParams, fromState, fromParams) {
            // Here we simply check if logged in but you can
            // implement more complex logic that inspects the
            // state to see if access is allowed or not
            if (!authenticationService.isLoggedIn()) {
                var $state = $injector.get("$state");

                // Redirect to login
                $state.go('loggedOut');

                // Prevent state change
                event.preventDefault();
            }
        });
    }
    checkAccessOnStateChange.$inject = ['$rootScope', '$injector', 'authenticationService'];

    // Export
    angular
        .module('appEpicom')
        .run(checkAccessOnStateChange);

})(angular);
