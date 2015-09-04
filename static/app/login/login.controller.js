(function(angular) {

    function LoginController($scope, $http, $window) {
        var vm = this;
        
        vm.username = '';
        vm.password = '';
        vm.error = '';
        vm.authenticate = authenticate;
        vm.logout = logout;
         
        function authenticate() {
            vm.error = '';
            $http.post('/login', { user: vm.username, pass: vm.password })
                .then(function(response) {
                    if (response.data == '302') {
                        $window.location.href = '/painel';
                    } else if (response.data == '401') {
                        vm.error = 'Sua conta está inativa, contate o administrador.'
                    } else {
                        vm.error = 'E-mail ou senha inválida.';
                    }
                }, function(response) {
                    vm.error = 'Erro no sistema, tente mais tarde.';
                });
        }
        
        function logout() {
            $http.post('/logout')
                .then(function(response) {}, function response() {});
        }
    }

    // Inject dependencies
    LoginController.$inject = ['$scope', '$http', '$window'];
    
    // Export
    angular
        .module('appEpicom')
        .controller('LoginController', LoginController);

})(angular);