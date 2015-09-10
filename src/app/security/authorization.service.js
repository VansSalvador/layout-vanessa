/* global angular: false */

(function (angular) {

    function authorizationService($log, $window) {

        var _userKey = 'session.user';
        var _tokenKey = 'session.accessToken';

        function isDefined(value) {
            return angular.isDefined(value) && value !== 'undefined';
        }

        // Instantiate data when service is loaded
        if (isDefined($window.localStorage.getItem(_userKey))) {
            this._user = JSON.parse($window.localStorage.getItem(_userKey));
        }

        if (isDefined($window.localStorage.getItem(_tokenKey))) {
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

        this.getUserName = function () {
            if (isDefined(this._user) && isDefined(this._user.username)) {
                return this._user.username;
            }

            return "<<< USER NAME >>>";
        };

        this.getAccessToken = function () {
            return this._accessToken;
        };

        this.setAccessToken = function (token) {
            this._accessToken = token;
            $window.localStorage.setItem(_tokenKey, JSON.stringify(token));
            return this;
        };

        this.hasRole = function (role) {
            return isDefined(this._user) && 
                isDefined(this._user.role) &&
                this._user.role === role;
        }

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
