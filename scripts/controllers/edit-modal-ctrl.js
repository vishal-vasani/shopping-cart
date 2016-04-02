app.controller('EditModalCtrl', ['$scope', '$modalInstance', 'p_item',
    function($scope, $modalInstance, p_item) {
        'use strict';
        $scope.item = p_item;

        $scope.changeColor = function(selectedColor){
        	$scope.item.p_selected_color = selectedColor;
        }

        $scope.ok = function() {
            $modalInstance.close($scope.item);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
]);
