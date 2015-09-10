/* global angular: false */

(function (angular) {

    function authorizationService($log, $window) {

        var _userKey = 'session.user';
        var _tokenKey = 'session.accessToken';

        // Instantiate data when service is loaded
        if ($window.localStorage.getItem(_userKey) && $window.localStorage.getItem(_userKey) !== 'undefined') {
            this._user = JSON.parse($window.localStorage.getItem(_userKey));
        }

        if ($window.localStorage.getItem(_tokenKey) && $window.localStorage.getItem(_tokenKey) !== 'undefined') {
            this._accessToken = JSON.parse($window.localStorage.getItem(_tokenKey));
        }

        this.getUser = function () {
            return this._user;
        };

        this.setUser = function (user) {
            this._user = user;
            $window.localStorage.setItem(_userKey, JSON.stringify(user));
            return this;
        };

        this.getAccessToken = function () {
            return this._accessToken;
        };

        this.setAccessToken = function (token) {
            this._accessToken = token;
            $window.localStorage.setItem(_tokenKey, JSON.stringify(token));
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
    authorizationService.$inject = ['$log', '$window'];

    angular
        .module('appEpicom')
        .service('authorizationService', authorizationService);

})(angular);
