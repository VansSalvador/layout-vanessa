(function (angular) {
    'use strict';

    angular
        .module('appEpicom')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }
    appRun.$inject = ['routerHelper'];

    function getStates() {
        return [{
            state: 'listaPedidos',
            config: {
                url: '/pedido',
                templateUrl: 'pedido/pedido.lista.tmpl.html',
                controller: 'PedidoListaController',
                controllerAs: 'vm',
                title: 'Pedidos'
            }
        }];
    }
})(angular);
