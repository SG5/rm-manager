'use strict';

rmManager.controller('issueCtrl', function($scope, $http, config) {

    $scope.issues = [];

    if (config.userId) {
        $http.get(config.url + '/issues.json?assigned_to_id=me')
            .success(function(data) {
                $scope.issues = data.issues;
            })
        ;
    }
});