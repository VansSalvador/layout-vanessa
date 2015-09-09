(function(angular) {

    function authorizationService($log/*, localStorage*/) {

        var _userKey = 'session.user';
        var _tokenKey = 'session.accessToken';

        // Instantiate data when service
        // is loaded
        //this._user = JSON.parse(localStorage.getItem());
        //this._accessToken = JSON.parse(localStorage.getItem(_tokenKey));

        this.getUser = function() {
            return this._user;
        };

        this.setUser = function(user) {
            this._user = user;
            //localStorage.setItem(_userKey, JSON.stringify(user));
            return this;
        };

        this.getAccessToken = function() {
            return this._accessToken;
        };

        this.setAccessToken = function(token) {
            this._accessToken = token;
            //localStorage.setItem(_tokenKey, token);
            return this;
        };

        /**
         * Destroy session
         */
        this.destroy = function destroy() {
            this.setUser(null);
            this.setAccessToken(null);
        };
    }
    authorizationService.$inject = ['$log'];

    angular
        .module('appEpicom')
        .service('authorizationService', authorizationService);

})(angular);
