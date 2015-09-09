(function(angular) {

    angular
        .module('appEpicom')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            // Rota padrão
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('loggedOut', {
                    url: '/',
                    templateUrl: 'login/login.tmpl.html',
                    controller: 'LoginController',
                    data: {
                        requireLogin: false
                    }
                })
                .state('accessDenied', {
                    url: '/',
                    templateUrl: 'security/accessDenied.tmpl.html',
                    data: {
                        requireLogin: false
                    }
                })
                .state('painel', {
                    abstract: true,
                    data: {
                        requireLogin: true
                    }
                })
                .state('painel.principal', {
                    url: '/painel',
                    templateUrl: 'partials/painel.tmpl.html'
                });
        }]);

})(angular);