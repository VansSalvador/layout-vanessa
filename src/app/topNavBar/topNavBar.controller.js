(function(angular) {

    /*@ngInject*/
    function TopNavBarController($scope) {
        $scope.$on('$includeContentLoaded', function(event) {
            $('.dropitmenu').dropit();
        });
    }
    TopNavBarController.$inject = ['$scope'];

    // Export
    angular
        .module('appEpicom')
        .controller('TopNavBarController', TopNavBarController);

})(angular);
