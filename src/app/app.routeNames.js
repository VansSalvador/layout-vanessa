/* global angular: false */

(function (angular) {

angular
    .module('appEpicom')
    .constant('RouteNames', {
        LOGGED_OUT: 'loggedOut',
        LOGOFF: 'logoff',
        LISTA_USUARIOS: 'painel.usuarios',
        HOME: 'painel.principal',
        PEDIDOS: 'painel.pedidos',
        DETALHE_PEDIDO: 'painel.pedido'
    });

    function assignRouteNamesToRootScope($rootScope, RouteNames) {
        $rootScope.routeNames = RouteNames;
    }
    assignRouteNamesToRootScope.$inject = ['$rootScope', 'RouteNames'];

    // Export
    angular
        .module('appEpicom')
        .run(assignRouteNamesToRootScope);

})(angular);
