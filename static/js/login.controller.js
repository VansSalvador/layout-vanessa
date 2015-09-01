var app=angular.module('painel', []);
app.controller('Login',['$scope','$http',function($scope,$http){
    $scope.dologin=function(userp,passp){
        $scope.error='';
        $http.post('/login', {user:userp,pass:passp}).
          then(function(response) {
            if(response.data=='302'){
                window.location.href='/painel';
            }else if (response.data=='401'){
                $scope.error='Esta conta está inativa, contate o seu administrador.';
            }else{
                $scope.error='E-mail ou senha inválida.';
            }
          }, function(response) {
                $scope.error='Erro no sistema, tente mais tarde.';
          });
    };
}]);