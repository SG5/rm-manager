'use strict';

rmManager.controller('issueCtrl', function($scope, $http, config) {

    $scope.issues   = [];
    $scope.statuses = [];
    $scope.lastIssue = config.lastIssue;

    $scope.loadIssueList = function() {
        $http.get(config.url + '/issues.json?assigned_to_id=me')
            .success(function(data) {
                $scope.issues = data.issues;
            })
        ;
    };

    $scope.startIssue = function(issueId) {
        var data = {
            issue: {
                status_id: config.issueStatusDefault.id
            }
        };
        $http.put(config.url + '/issues/' +issueId+ '.json', data)
            .success(function(data) {
                config.lastIssue = issueId;
                $scope.lastIssue = config.lastIssue;
            })
        ;
    };

    if (config.userId) {
        $scope.loadIssueList();
        setInterval($scope.loadIssueList, 60 * 1000);


        $http.get(config.url + '/issue_statuses.json')
            .success(function(data) {
                $scope.statuses = data.issue_statuses;
                config.issueStatuses = data.issue_statuses;
            })
        ;
    }
});