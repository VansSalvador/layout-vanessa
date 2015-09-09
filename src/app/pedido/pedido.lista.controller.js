(function(angular) {

    /* @ngInject */
    function PedidoListaController($scope, $http, $rootScope, $window) {
        var vm = this;

        vm.search = search;
        vm.data = [];
        vm.gridOptions = gridOptions;
        
        function search() {
          vm.data = [];
        }

        var gridOptions = {
          enableFiltering: false,
          showGridFooter: false,
          showColumnFooter: true,
          columnDefs: [
            { name: 'data', width: 50 },
            { name: 'codigoPedido', width: 50 },
            { name: 'codigoCliente', width: 50 },
            { name: 'nomeCliente', width: 50 },
            { name: 'valor', width: 50 },
            { name: 'status', width: 50 },
            { name: 'fornecedores' },
            { name: 'produtos' } 
          ]
        };
    }
    
    // Export
    angular
        .module('appEpicom')
        .controller('PedidoListaController', PedidoListaController);

})(angular);