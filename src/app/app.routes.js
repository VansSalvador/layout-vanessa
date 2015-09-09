(function(angular) {

  angular
    .module('appEpicom')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      // Rota padrão
      $urlRouterProvider.otherwise('loggedOut');
      
      $stateProvider
        .state('/', { url: '/', redirectTo: 'loggedOut', data: { requireLogin: true } })
        .state('loggedOut', { url: '/', template: '<h1>My Contacts</h1>', controller: 'LoginController', data: { requireLogin: true } })
        .state('painel', { abstract: true, data: { requireLogin: true }})
        .state('painel.principal', { url: '/painel', templateUrl: 'partials/painel.tmpl.html' });
    }]);

    /*
    angular
        .module('appEpicom')
        .run(['$rootScope', function ($rootScope) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
                var requireLogin = toState.data.requireLogin;

                if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
                    event.preventDefault();
                    // get me a login modal!
                    $state.go('/')
                }
            });
        }]);
    */
})(angular);
