'use strict';

rmManager.factory('config', function($http) {
    var defaultConfig = {
        url: '',
        apiKey: '',

        userId: 0,
        login: 'anonymous',
        firstName: 'Redmine',
        lastName: 'User',

        lastTask: 0
    };

    var config = localStorage.config && JSON.parse(localStorage.config) || defaultConfig;

    var test = function(callback) {
        var url = require('url').parse(config.url);

        require('http').get({
            hostname: url.hostname,
            port: url.port,
            path: '/users/current.json',
            headers: {
                'X-Redmine-API-Key': config.apiKey
            }
        }, function(res) {
            var body = '';

            res.on('data', function (chunk) {
                body += chunk;
            });

            res.on('end', function() {
                if (200 == res.statusCode) {
                    var data = JSON.parse(body);
                    config.userId = data.user.id;
                    config.login = data.user.login;
                    config.firstName = data.user.firstname;
                    config.lastName = data.user.lastname;

                    $http.defaults.headers.common['X-Redmine-API-Key'] = config.apiKey;

                    callback && callback(true);
                } else {
                    callback && callback(false);
                }
            });
        }).on('error', function(e) {
            callback && callback(false);
        });
    };

    config.save = function(callback) {
        test(function(result) {
            if (result) {
                localStorage.config = JSON.stringify(config);
            }
            callback && callback(result);
        });
    };

    return config;
});