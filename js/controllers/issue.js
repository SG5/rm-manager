'use strict';

rmManager.controller('issueCtrl', function($scope, $http, config, issue) {

    $scope.issues   = [];
    $scope.statuses = [];
    $scope.lastIssue = config.get('lastIssue');

    var loadIssueListTimeout;
    $scope.loadIssueList = function() {
        clearTimeout(loadIssueListTimeout);
        loadIssueListTimeout = setTimeout($scope.loadIssueList, 60 * 1000);

        issue.getIssueList(function(data){
            $scope.issues = data;
        });
    };

    $scope.startIssue = function(issueId) {
        issue.startIssue(issueId, function(err, response) {
            config.set('lastIssue', issueId);
            $scope.lastIssue = issueId;
        });
    };

    $scope.stopIssue = function(issueId) {
        config.set('lastIssue', 0);
        $scope.lastIssue = 0;
    };

    if (config.get('userId')) {
        $scope.loadIssueList();

        issue.getIssueStatuses(function(err, data) {
            $scope.statuses = data.issue_statuses;
            config.set('issueStatuses', data.issue_statuses);
        });
    }
});