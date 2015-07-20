'use strict';

rmManager.service('issue', function($http, config) {

    this.getIssueList = function(callback) {
        $http.get(config.get('url') + '/issues.json?assigned_to_id=me')
            .success(function(reponse) {
                var ajaxInProgress = 0;
                for (var i = reponse.issues.length-1; i >= 0; i--) {
                    reponse.issues[i].spentTime = 0;

                    (function(i){
                        ajaxInProgress++;
                        $http.get(config.get('url') + '/time_entries.json?issue_id=' + reponse.issues[i].id)
                            .success(function(responseTimeEntry) {
                                responseTimeEntry.time_entries.forEach(function(el) {
                                    reponse.issues[i].spentTime = reponse.issues[i].spentTime + el.hours;
                                });

                                ajaxInProgress--;
                                if (0 == ajaxInProgress) {
                                    callback && callback(reponse.issues);
                                }
                            });
                    }(i));
                }
            })
        ;
    };

    this.startIssue = function(issueId, callback) {
        var data = {
            issue: {
                status_id: config.get('issueStatusDefault').id
            }
        };

        $http.put(config.get('url') + '/issues/' +issueId+ '.json', data)
            .success(function(reponse) {
                callback && callback(0, reponse);
            })
        ;
    };

    this.getIssueStatuses = function(callback) {
        $http.get(config.get('url') + '/issue_statuses.json')
            .success(function(data) {
                callback && callback(0, data);
            })
        ;
    };

});