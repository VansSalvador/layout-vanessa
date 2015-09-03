var app=angular.module('users', []); //can't use the ng-resource because User is an embedded document
var deletion=false;
var refresh=false;
app.controller('userlisting',['$scope','$http',function($scope,$http){
    refresh=function(){
        $http.get('/api/listusers').then(function(users){//TODO animated loading feedback
            $scope.users=users.data;
        },function(error){
            alert(error.data);//TODO
        });
    };
    refresh();
    $scope.opendialog=function(user){
        $( "#dialogUser" ).dialog( "open" );
    };
    $scope.confirmdelete=function(user){
        deletion=user;
        $( "#dialogDeleteUser" ).dialog( "open" );
    };
    //TODO cancel dialogs
}]);
app.controller('confirmdeletion',['$scope','$http',function($scope,$http){
    $scope.deleteuser=function(){
        $( "#dialogDeleteUser" ).dialog( "close" );
         $http.post('/api/deleteuser',{user:deletion.username}).then(function(ok){//TODO animated loading feedback
            refresh();
        },function(error){
            alert(error.data);//TODO
        });
    };
}]);