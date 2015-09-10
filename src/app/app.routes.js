/* global angular: false */

(function (angular) {

    angular
        .module('appEpicom')
        .config(['$stateProvider', '$urlRouterProvider', 'RouteNames', function ($stateProvider, $urlRouterProvider, RouteNames) {
            // Rota padrão
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state(RouteNames.LOGGED_OUT, {
                    url: '/',
                    templateUrl: 'login/login.tmpl.html',
                    controller: 'LoginController',
                    views: {
                        'main': {
                            templateUrl: 'login/login.tmpl.html'
                        }
                    },
                    data: {
                        requireLogin: false
                    }
                })
                .state('accessDenied', {
                    url: '/',
                    views: {
                        'main': {
                            templateUrl: 'security/accessDenied.tmpl.html'
                        }
                    },
                    data: {
                        requireLogin: false
                    }
                })
                .state('painel', {
                    abstract: true,
                    data: {
                        requireLogin: true
                    },
                    views: {
                        'main': {
                            templateUrl: 'common/layout.tmpl.html',
                            controller: 'LayoutController'
                        }
                    }
                })
                .state(RouteNames.HOME, {
                    url: '/painel',
                    templateUrl: 'home/home.tmpl.html'
                })
                .state(RouteNames.PEDIDOS, {
                    url: '/pedido',
                    templateUrl: 'pedido/pedido.lista.tmpl.html',
                    controller: 'PedidoListaController',
                    controllerAs: 'vm',
                    title: 'Pedidos'
                })
                .state(RouteNames.DETALHE_PEDIDO, {
                    url: '/pedido/{idPedido:[0-9]{1,8}}',
                    templateUrl: 'pedido/pedido.tmpl.html',
                    controller: 'PedidoController',
                    controllerAs: 'vm',
                    title: 'Pedido'
                })
                .state(RouteNames.USUARIOS, {
                    url: '/pedido',
                    templateUrl: 'usuarios/usuario.lista.tmpl.html',
                    controller: 'UsuarioListaController',
                    controllerAs: 'vm',
                    title: 'Pedidos'
                });
        }]);

})(angular);
