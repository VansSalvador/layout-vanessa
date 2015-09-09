// http://www.jvandemo.com/learn-how-to-make-authentication-in-your-angular-applications-simpler-and-more-consistent/
(function(angular) {

    function authenticationService($http, authorizationService) {

        /**
         * Check whether the user is logged in
         * @returns boolean
         */
        this.isLoggedIn = function isLoggedIn() {
            return session.getUser() !== null;
        };

        /**
         * Log in
         *
         * @param credentials
         * @returns {*|Promise}
         */
        this.logIn = function(credentials) {
            return $http
                .post('/login', credentials)
                .then(function(response) {
                    var data = response.data;
                    authorizationService.setUser(data.user);
                    authorizationService.setAccessToken(data.accessToken);
                });
        };

        /**
         * Log out
         *
         * @returns {*|Promise}
         */
        this.logOut = function() {
            return $http
                .get('/logout')
                .then(function(response) {

                    // Destroy session in the browser
                    authorizationService.destroy();
                });
        };
    }
    authenticationService.$inject = ['$http', 'authorizationService'];

    angular
        .module('appEpicom')
        .service('authenticationService', authenticationService);

})(angular);