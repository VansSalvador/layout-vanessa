(function(angular) {

    function checkAccessDuringApplicationBootstrap($window, $state, authenticationService) {

        if (authenticationService.isLoggedIn()) {
            return;
        }

        // Redirect to third party login page
        $state.go('/')

        // Make sure bootstrap process is stopped
        throw new Error('Access denied');
    }
    checkAccessDuringApplicationBootstrap.$inject = ['$window', '$state', 'authenticationService'];

    // Export
    angular
        .module('appEpicom')
        .run(checkAccessDuringApplicationBootstrap);

})(angular);