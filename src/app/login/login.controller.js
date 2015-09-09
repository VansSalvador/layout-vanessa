(function (angular) {

    /*@ngInject*/
    function LoginController($scope, $http, $rootScope, $state) {
        var vm = this;

        vm.username = '';
        vm.password = '';
        vm.error = '';
        vm.authenticate = authenticate;
        vm.logout = logout;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function authenticate() {
            vm.error = '';
            $http.post('/login', {
                    user: vm.username,
                    pass: vm.password
                })
                .then(function (response) {
                    if (response.status == 200) {
                        setCurrentUser(response.data);
                        $state.go('/painel.principal');
                    } else if (response.status == 401) {
                        vm.error = 'Sua conta está inativa, contate o administrador.'
                    } else {
                        vm.error = 'E-mail ou senha inválida.';
                    }
                }, function (response) {
                    vm.error = 'Erro no sistema, tente mais tarde.';
                });
        }

        function logout() {
            $http.post('/logout')
                .then(function (response) {
                    setCurrentUser(undefined);
                }, function response() {});
        }
    }
    LoginController.$inject = ['$scope', '$http', '$rootScope', '$state'];

    // Export
    angular
        .module('appEpicom')
        .controller('LoginController', LoginController);

})(angular);
