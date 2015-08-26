var app=angular.module('painel', []);
app.controller('Login',['$scope',function($scope){
    $scope.dologin=function(user,pass){
        console.log(user);
    };
}]);