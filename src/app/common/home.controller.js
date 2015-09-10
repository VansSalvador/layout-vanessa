/* global angular: false */
/* global $: false */

(function (angular) {

    /*@ngInject*/
    function HomeController($scope) {
        $scope.$on('$includeContentLoaded', function (event) {
            $('.dropitmenu').dropit();
        });
    }
    HomeController.$inject = ['$scope'];

    // Export
    angular
        .module('appEpicom')
        .controller('HomeController', HomeController);

})(angular);
