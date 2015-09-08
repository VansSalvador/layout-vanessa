var app=angular.module('users', []); //can't use the ng-resource because User is an embedded document
var deletion=false;
var refresh=false;
var editing=false;
var formscope=false;
var opendialog=function(user){
    editing=user;
    formscope.pass1='';
    formscope.pass2='';
    if(editing){
        document.querySelector('#dialogUser #active').checked=user.active;
        formscope.name=user.fullname;
        formscope.mail=user.username;
        formscope.role=user.role;
    }else{
        document.querySelector('#dialogUser #active').checked=true;
        formscope.name='';
        formscope.mail='';
        formscope.role='';
    }
    $( "#dialogUser" ).dialog( "open" );
};
app.controller('userlisting',['$scope','$http',function($scope,$http){
    refresh=function(){
        $http.get('/api/listusers').then(function(users){//TODO animated loading feedback
            $scope.users=users.data;
        },function(error){
            alert(error.data);//TODO
        });
    };
    refresh();
    $scope.opendialog=opendialog;
    $scope.confirmdelete=function(user){
        deletion=user;
        $( "#dialogDeleteUser" ).dialog( "open" );
    };
}]);
app.controller('adduserctl',['$scope','$http',function($scope,$http){
   $scope.opendialog=opendialog;
}]);
app.controller('confirmdeletion',['$scope','$http',function($scope,$http){
    $scope.deleteuser=function(){
        $( "#dialogDeleteUser" ).dialog( "close" );
            $http.post('/api/deleteuser',{user:deletion.username}).then(function(ok){
            refresh();
        },function(error){
            alert(error.data);//TODO
        });
    };
}]);
app.controller('adduser',['$scope','$http',function($scope,$http){
    formscope=$scope;
    $scope.add=function(){
        $http.post('/api/adduser',{
            name:$scope.name,
            mail:$scope.mail,
            role:$scope.role,
            pass:$scope.pass1,
            active:document.querySelector('#dialogUser #active').checked?'active':'inactive',
            current:editing?editing.username:false,
        }).then(function(users){//TODO animated loading feedback
            $( "#dialogUser" ).dialog( "close" );
            refresh();
        },function(error){
            alert(error.data);//TODO
        });
    };
}]);