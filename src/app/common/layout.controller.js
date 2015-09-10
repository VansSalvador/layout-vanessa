/* global angular: false */
/* global $: false */

(function (angular) {

    /*@ngInject*/
    function LayoutController($scope) {
        $scope.$on('$viewContentLoaded', function (event) {
            $('.dropitmenu').dropit();
        });
    }
    LayoutController.$inject = ['$scope'];

    // Export
    angular
        .module('appEpicom')
        .controller('LayoutController', LayoutController);

})(angular);
