app.controller('CartCtrl', ['$scope', '$stateParams', '$rootScope', '$state', 'CartService', 'EditModalService',
    function($scope, $stateParams, $rootScope, $state, CartService, EditModalService) {
        'use strict';
        
        $scope.getProducts = function(){
            CartService.getProductsInCart().then(function(products){
                $scope.products = products;
            })
        }

        $scope.removeItem = function(index){
        	CartService.removeItem(index).then(function(status){
                if(status){
                    $scope.products.splice(index, 1);
                }
            })
        }

        $scope.showEditModal = function(item){
        	EditModalService.showEditBox('', item, updateCart);
        }

        function updateCart(updatedItem){
        	$scope.products.forEach(function(item){
        		if(item.p_id === updatedItem.p_id){
        			item.p_selected_size = updatedItem.p_selected_size;
        			item.p_quantity = updatedItem.p_quantity;
        			item.p_selected_color = updatedItem.p_selected_color;
        		}
        	})
        }

        $scope.$watch('products', function(newValues, oldValues) {
            calculateTotal();
        }, true);

        function calculateTotal() {
        	$scope.items = 0;
        	$scope.discoutAmount = 0;
            $scope.discountCode = '';
            $scope.subTotal = 0;
            $scope.grandTotal = 0;
            
            var discountPercentage = 0;

            if($scope.products && $scope.products.length){
            	$scope.items = $scope.products.reduce(function(a,b){
	            	return {p_quantity: parseInt(a.p_quantity) + parseInt(b.p_quantity)};
	            }).p_quantity;

                $scope.products.forEach(function(item, idx) {
                    if (!item.p_quantity || item.p_quantity == 0)
                        item.p_quantity = 1;
                    item.p_price = item.p_originalprice * item.p_quantity; 
                    $scope.subTotal += (item.p_originalprice * item.p_quantity);
                });

                if($scope.items === 3){
                	discountPercentage = 5;
                	$scope.discountCode = 'JF' + 5;
                } else if($scope.items > 3 && $scope.items < 7){
                	discountPercentage = 10;
                	$scope.discountCode = 'JF' + 10;
                } else if($scope.items > 10){
                	discountPercentage = 25
                	$scope.discountCode = 'JF' + 25;
                } else {
                	$scope.discountCode = '';
                }

                $scope.discountAmount = ($scope.subTotal * (discountPercentage / 100));
                $scope.grandTotal = ($scope.subTotal - $scope.discountAmount).toFixed(2);
            } else {
            	$scope.items = 0
            }
        }
    }
]);