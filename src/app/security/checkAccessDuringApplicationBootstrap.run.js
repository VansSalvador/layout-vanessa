/* global angular: false */

(function (angular) {

    function checkAccessDuringApplicationBootstrap($state, authenticationService) {

        if (authenticationService.isLoggedIn()) {
            return;
        }

        // Redireciona para a página de login
        $state.go('loggedOut');
    }
    checkAccessDuringApplicationBootstrap.$inject = ['$state', 'authenticationService'];

    // Export
    angular
        .module('appEpicom')
        .run(checkAccessDuringApplicationBootstrap);

})(angular);
