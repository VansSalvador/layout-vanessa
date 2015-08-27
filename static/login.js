var app=angular.module('painel', []);
app.controller('Login',['$scope','$http',function($scope,$http){
    $scope.dologin=function(userp,passp){
        $http.post('/login', {user:userp,pass:passp}).
          then(function(response) {
            if(response.data=='302'){
                window.location.href='/painel';
            }else{
                alert("Falha de login!!");//TODO
            }
          }, function(response) {
            alert("Erro!");//TODO
          });
    };
}]);