/* global angular: false */

(function (angular) {

    angular
        .module('appEpicom')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
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
                })
                .state('painel.listaPedidos', {
                    url: '/pedido',
                    templateUrl: 'pedido/pedido.lista.tmpl.html',
                    controller: 'PedidoListaController',
                    controllerAs: 'vm',
                    title: 'Pedidos'
                })
                .state('painel.pedido', {
                    url: '/pedido/{idPedido:[0-9]{1,8}}',
                    templateUrl: 'pedido/pedido.tmpl.html',
                    controller: 'PedidoController',
                    controllerAs: 'vm',
                    title: 'Pedido'
                });
        }]);

})(angular);
