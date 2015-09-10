/* global angular: false */

(function (angular) {

    /*@ngInject*/
    function LoginController($scope, $http, $rootScope, $state, authenticationService) {
        var vm = this;

        vm.username = '';
        vm.password = '';

        vm.authenticate = function () {
            authenticationService.logIn({
                user: vm.username,
                pass: vm.password
            }).then(function () {
                $state.go('painel.principal');
            });
        };
    }
    LoginController.$inject = ['$scope', '$http', '$rootScope', '$state', 'authenticationService'];

    // Export
    angular
        .module('appEpicom')
        .controller('LoginController', LoginController);

})(angular);
