'use strict';

rmManager.controller('issueCtrl', function($scope, $http, config) {

    $scope.issues   = [];
    $scope.statuses = [];

    var loadIssueList = function() {
        $http.get(config.url + '/issues.json?assigned_to_id=me')
            .success(function(data) {
                $scope.issues = data.issues;
            })
        ;
    };

    if (config.userId) {
        loadIssueList();
        setInterval(loadIssueList, 60 * 1000);


        $http.get(config.url + '/issue_statuses.json')
            .success(function(data) {
                $scope.statuses = data.issue_statuses;
                config.issueStatuses = data.issue_statuses;
            })
        ;
    }
});