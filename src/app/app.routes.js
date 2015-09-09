(function(angular) {

  angular
    .module('appEpicom')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      // Rota padrão
      $urlRouterProvider.otherwise('login');
      
      $stateProvider
        .state('loggedOut', { url: '/', templateUrl: 'login/loggedOut.tmpl.html', controller: 'LoginController' })
        .state('loggedIn', { url: '/painel', templateUrl: 'partials/painel.html' });
    }]);

})(angular);