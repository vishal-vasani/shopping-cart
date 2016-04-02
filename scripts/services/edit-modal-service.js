app.factory('EditModalService', ['$modal',
    function($modal) {
        'use strict';

        var editModalService = {};

        editModalService.showEditBox = function(size, item, cb) {
            var modalInstance = $modal.open({
                templateUrl: 'views/edit-modal.html',
                controller: 'EditModalCtrl',
                size: size,
                backdrop: 'static',
                resolve: {
                    p_item: function() {
                        return angular.copy(item);
                    }
                }
            });

            modalInstance.result.then(function(updatedItem) {
                cb(updatedItem);
            }, function() {

            });
        };

        return editModalService;
    }
]);
