'use strict';

rmManager.controller('issueCtrl', function($scope, $http, config) {

    $scope.issues   = [];
    $scope.statuses = [];

    if (config.userId) {
        $http.get(config.url + '/issues.json?assigned_to_id=me')
            .success(function(data) {
                $scope.issues = data.issues;
            })
        ;

        $http.get(config.url + '/issue_statuses.json')
            .success(function(data) {
                $scope.statuses = data.issue_statuses;
                config.issueStatuses = data.issue_statuses;
            })
        ;
    }
});