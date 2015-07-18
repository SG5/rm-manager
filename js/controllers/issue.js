'use strict';

rmManager.controller('issueCtrl', function($scope, $http, config, issue) {

    $scope.issues   = [];
    $scope.statuses = [];
    $scope.lastIssue = config.get('lastIssue');

    $scope.loadIssueList = function() {
        issue.loadIssueList(function(data){
            $scope.issues = data;
        });
    };

    $scope.startIssue = function(issueId) {
        issue.startIssue(issueId, function() {
            config.lastIssue = issueId;
            $scope.lastIssue = config.lastIssue;
        });
    };

    if (config.get('userId')) {
        $scope.loadIssueList();
        setInterval($scope.loadIssueList, 60 * 1000);


        $http.get(config.get('url') + '/issue_statuses.json')
            .success(function(data) {
                $scope.statuses = data.issue_statuses;
                config.issueStatuses = data.issue_statuses;
            })
        ;
    }
});