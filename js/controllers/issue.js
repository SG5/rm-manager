'use strict';

rmManager.controller('issueCtrl', function($scope, $http, $timeout, config, issue) {

    $scope.issues   = [];
    $scope.statuses = [];
    $scope.lastIssue = config.get('lastIssue');

    var loadIssueListTimeout;
    $scope.loadIssueList = function() {
        $timeout.cancel(loadIssueListTimeout);
        loadIssueListTimeout = $timeout($scope.loadIssueList, 60 * 1000);

        issue.getIssueList(function(data){
            $scope.issues = data;
        });
    };

    var startIssueTimeout;
    var runIssueTimer = function (issue) {
        issue.spentTime += 1;

        $timeout.cancel(startIssueTimeout);
        startIssueTimeout = $timeout(function(){runIssueTimer(issue)}, 1000);
    };

    $scope.startIssue = function(issueObj) {
        runIssueTimer(issueObj);
        issue.startIssue(issueObj.id, function(err, response) {
            config.set('lastIssue', issueObj.id);
            $scope.lastIssue = issueObj.id;
        });
    };

    $scope.stopIssue = function(issue) {
        $timeout.cancel(startIssueTimeout);
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