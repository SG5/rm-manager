'use strict';

rmManager.controller('settingCtrl', function($scope, config, UIkit) {

    $scope.config = config.get();

    $scope.saveConfig = function() {
        config.save(function(err) {
            if (err) {
                UIkit.notify(
                    err,
                    {
                        status:'danger',
                        pos:'bottom-left'
                    }
                );
                return;
            }
            UIkit.modal('#my-id').hide();
        });
    }
});