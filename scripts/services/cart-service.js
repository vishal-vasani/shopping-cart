app.factory('CartService', ['$http', '$q',
    function($http, $q) {
        'use strict';

        var cartService = {};

        cartService.getProductsInCart = function() {
            var deferred = $q.defer();

            if(localStorage.products){
                deferred.resolve(JSON.parse(localStorage.products));
            } else {
                $http.get('data/cart.json').then(function(res) {
                    var cartProducts = res.data.productsInCart;
                    localStorage.products = JSON.stringify(cartProducts);
                    deferred.resolve(cartProducts);
                }) ;              
            }

            return deferred.promise;
        };

        cartService.removeItem = function(index){
            var deferred = $q.defer();

            var products = localStorage.products? JSON.parse(localStorage.products) : null;

            if(products){
                products.splice(index, 1);
                localStorage.products = JSON.stringify(products);
                deferred.resolve(true);
            }

            return deferred.promise;
        } 

        return cartService;
    }
]);