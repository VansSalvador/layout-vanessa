/* global angular: false */

(function (angular) {

    /* @ngInject */
    function PedidoController($scope, $http, $rootScope, $window, $stateParams, ModalService) {
        var vm = this;

        vm.data = {};

        /*
        // Just provide a template url, a controller and call 'showModal'.
            ModalService.showModal({
              templateUrl: "yesno/yesno.html",
              controller: "YesNoController"
            }).then(function(modal) {
              // The modal object has the element built, if this is a bootstrap modal
              // you can call 'modal' to show it, if it's a custom modal just show or hide
              // it as you need to.
              modal.element.modal();
              modal.close.then(function(result) {
                $scope.message = result ? "You said Yes" : "You said No";
              });
            }).catch(function(error) {
          // error contains a detailed error message.
          console.log(error);
        });
         */

        vm.load = function () {
            vm.data = {};
        };
    }
    PedidoController.$inject = ['$scope', '$http', '$rootScope', '$window', '$stateParams', 'ModalService'];

    // Export
    angular
        .module('appEpicom')
        .controller('PedidoController', PedidoController);

})(angular);
