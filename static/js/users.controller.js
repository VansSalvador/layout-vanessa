var app=angular.module('users', []); //can't use the ng-resource because User is an embedded document
var deletion=false;
var refresh=false;
var editing=false;
var formscope=false;

function opendialog(user){
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
            alert("Erro no sistema tente mais tarde.");//TODO pode ser token expirado
        });
    };
    refresh();
    $scope.opendialog=opendialog;
    $scope.confirmdelete=function(user){
        deletion=user;
        document.querySelector('#deletename').innerHTML='"'+user.fullname+'"';
        $( "#dialogDeleteUser" ).dialog( "open" );
    };
}]);
app.controller('confirmdeletion',['$scope','$http',function($scope,$http){
    $scope.deleteuser=function(){
        $( "#dialogDeleteUser" ).dialog( "close" );
            $http.post('/api/deleteuser',{user:deletion.username}).then(function(ok){
            refresh();
        },function(error){
            alert("Erro no sistema tente mais tarde.");//TODO pode ser token expirado
        });
    };
    $scope.closedelete=function(){
        $( "#dialogDeleteUser" ).dialog( "close" );
    }
}]);
app.controller('adduser',['$scope','$http',function($scope,$http){
    formscope=$scope;
    $scope.add=function(){
        $scope.servererror=false;
        $http.post('/api/adduser',{
            name:$scope.name,
            mail:$scope.mail,
            role:$scope.role,
            pass:$scope.pass1,
            active:document.querySelector('#dialogUser #active').checked?'active':'inactive',
            current:editing?editing.username:false,
        }).then(function(users){
            $( "#dialogUser" ).dialog( "close" );
            refresh();
        },function(error){
            $scope.servererror=true;
        });
    };
    $scope.closeuserform=function(){
        $( "#dialogUser " ).dialog( "close" );
    }
}]);