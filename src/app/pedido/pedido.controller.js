(function (angular) {

    /* @ngInject */
    function PedidoController($scope, $http, $rootScope, $window) {
        var vm = this;

        vm.data = {};
        vm.load = load;

        function load() {
            vm.data = {};
        }
    }
    PedidoController.$inject = ['$scope', '$http', '$rootScope', '$window'];

    // Export
    angular
        .module('appEpicom')
        .controller('PedidoController', PedidoController);

})(angular);
