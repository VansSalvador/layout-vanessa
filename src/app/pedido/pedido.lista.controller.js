(function(angular) {

    /* @ngInject */
    function PedidoListaController($scope, $http, $rootScope, $window, uiGridConstants) {
        var vm = this;
      
        var paginationOptions = {
            pageNumber: 1,
            pageSize: 10,
            sort: null
        };

        var gridOptions = {
            data: [],
            enableFiltering: false,
            showGridFooter: false,
            showColumnFooter: true,
            paginationPageSizes: [5, 10, 25, 50, 100],
            paginationPageSize: 10,
            useExternalPagination: true,
            useExternalSorting: true,
            columnDefs: [
                { name: 'data', width: 50, enableSorting: true },
                { name: 'codigoPedido', width: 50 },
                { name: 'codigoCliente', width: 50 },
                { name: 'nomeCliente', width: 50 },
                { name: 'valor', width: 50 },
                { name: 'status', width: 50 },
                { name: 'fornecedores' },
                { name: 'produtos' } 
            ],
            onRegisterApi: function(gridApi) {
                vm.gridApi = gridApi;
                vm.gridApi.core.on.sortChanged(vm, function(grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        vm.paginationOptions.sort = null;
                    } else {
                        vm.paginationOptions.sort = sortColumns[0].sort.direction;
                    }
                    search();
                });
                
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    vm.paginationOptions.pageNumber = newPage;
                    vm.paginationOptions.pageSize = pageSize;
                    search();
                });
            }
        };

        function search() {
            var url;
            switch(paginationOptions.sort) {
                case uiGridConstants.ASC:
                    url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_ASC.json';
                    break;
                case uiGridConstants.DESC:
                    url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
                    break;
                default:
                    url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json';
                    break;
            }
        
            $http.get(url)
                .success(function (data) {
                    vm.gridOptions.totalItems = 100;
                    var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
                    vm.gridOptions.data = data.slice(firstRow, firstRow + paginationOptions.pageSize);
                });
        };
        
        search();

        vm.search = search;
        vm.gridOptions = gridOptions;
        vm.paginationOptions = paginationOptions;
    }
    
    // Export
    angular
        .module('appEpicom')
        .controller('PedidoListaController', PedidoListaController);

})(angular);
