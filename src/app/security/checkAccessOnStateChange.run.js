(function(angular) {

    function checkAccessOnStateChange($rootScope, authenticationService, $state) {

        // Listen for location changes
        // This happens before route or state changes
        $rootScope.$on('$locationChangeStart', function(event, newUrl, oldUrl) {
            if (!authenticationService.isLoggedIn()) {

                // Redirect to login

                // Prevent location change
                event.preventDefault();
            }
        });

        // Listen for route changes when using ngRoute
        $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {

            // Here we simply check if logged in but you can
            // implement more complex logic that inspects the
            // route to see if access is allowed or not
            if (!authenticationService.isLoggedIn()) {

                // Redirect to login

                // Prevent state change
                event.preventDefault();
            }
        });

        // Listen for state changes when using ui-router
        $rootScope.$on('$stateChangeStart', function($state, event, toState, toParams, fromState, fromParams) {

            // Here we simply check if logged in but you can
            // implement more complex logic that inspects the
            // state to see if access is allowed or not
            if (!authenticationService.isLoggedIn()) {
                // Redirect to login
				$state.go('/')

                // Prevent state change
                event.preventDefault();
            }
        });
    }
    checkAccessOnStateChange.$inject = ['$rootScope', 'authenticationService', '$state'];

    // Export
    angular
        .module('appEpicom')
        .run(checkAccessOnStateChange);

})(angular);