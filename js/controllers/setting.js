'use strict';

rmManager.controller('settingCtrl', function($scope, config, UIkit) {

    $scope.config = config;

    $scope.saveConfig = function() {
        config.save(function(result) {
            if (result) {
                UIkit.modal('#my-id').hide();
            } else {
                UIkit.notify("Can't connect to server", {status:'danger'})
            }
        });
    }
});