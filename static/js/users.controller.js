var app=angular.module('users', []); //can't use the ng-resource because User is an embedded document
var deletion=false;
var refresh=false;
var editing=false;
var opendialog=function(user){
    editing=user;
    $( "#dialogUser" ).dialog( "open" );
    document.querySelector('#dialogUser #password').value='';
    document.querySelector('#dialogUser #password_confirm').value='';
    if(editing){
        document.querySelector('#dialogUser #active').checked=user.active;
        document.querySelector('#dialogUser #user').value=user.fullname;
        document.querySelector('#dialogUser #email').value=user.username;
        document.querySelector('#dialogUser #profile').value=user.role;
    }else{
        document.querySelector('#dialogUser #active').checked=true;
        document.querySelector('#dialogUser #user').value='';
        document.querySelector('#dialogUser #email').value='';
        document.querySelector('#dialogUser #profile').value='';//TODO
    }
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
    //TODO cancel dialogs
}]);
app.controller('adduserctl',['$scope','$http',function($scope,$http){
   $scope.opendialog=opendialog;
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
app.controller('adduser',['$scope','$http',function($scope,$http){
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