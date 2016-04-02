var app = angular.module('app', [
    /* Third Party Modules */
    'ui.router',
    'ui.bootstrap'
]);


app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        'use strict';
        
        $urlRouterProvider.otherwise('/cart');
        
        $stateProvider.state("cart", {
            url: "/cart",
            templateUrl: 'views/cart.html',
            controller: 'CartCtrl'
        })
    }
]);