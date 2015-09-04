(function(angular) {

    function TopNavBarController($scope) {
        $scope.$on('$includeContentLoaded', function(event) {
            $('.dropitmenu').dropit();
        });
    }

    // Inject dependencies
    TopNavBarController.$inject = ['$scope'];

    // Export
    angular
        .module('appEpicom')
        .controller('TopNavBarController', TopNavBarController);

})(angular);