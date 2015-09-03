var app=angular.module('users', []); //can't use the ng-resource because User is an embedded document
app.controller('userlisting',['$scope','$http',function($scope,$http){
    $http.get('/api/listusers').then(function(users){
        $scope.users=users.data;
    },function(error){
        alert(error);//TODO
    });
    $scope.opendialog=function(){
        $( "#dialogUser" ).dialog( "open" );
    }
}]);