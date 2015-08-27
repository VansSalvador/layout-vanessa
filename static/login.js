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
            // this callback will be called asynchronously
            // when the response is available
          }, function(response) {
            alert("Erro!");//TODO
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
        console.log(user);
    };
}]);