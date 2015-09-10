/* global angular: false */
/* global $: false */

(function (angular) {

    /*@ngInject*/
    function LayoutController($scope, $state, authenticationService, RouteNames) {
        $scope.$on('$viewContentLoaded', function (event) {
            $('.dropitmenu').dropit();
        });

        this.logout = function () {
            authenticationService
                .logOut()
                .then(function () {
                    $state.go(RouteNames.LOGGED_OFF);
                });
        };
    }
    LayoutController.$inject = ['$scope', '$state', 'authenticationService', 'RouteNames'];

    // Export
    angular
        .module('appEpicom')
        .controller('LayoutController', LayoutController);

})(angular);
