(function(angular) {

    /*@ngInject*/
    function PageController($scope, $route) {
        $scope.pageTitle = $route.current.$$route.pageTitle;
        console.log($scope.pageTitle);
    }
    PageController.$inject = ['$scope', '$route'];

    // Export
    angular
        .module('appEpicom')
        .controller('PageController', PageController);

})(angular);