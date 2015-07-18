'use strict';

rmManager.service('issue', function($http, config) {

    this.loadIssueList = function(callback) {
        $http.get(config.get('url') + '/issues.json?assigned_to_id=me')
            .success(function(reponse) {
                callback && callback(reponse.issues);
            })
        ;
    };

    this.startIssue = function(issueId, callback) {
        var data = {
            issue: {
                status_id: config.issueStatusDefault.id
            }
        };

        $http.put(config.url + '/issues/' +issueId+ '.json', data)
            .success(function(reponse) {
                callback && callback(reponse);
            })
        ;
    };

});