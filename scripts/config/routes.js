angular.module("CustomerMgmt")
    .config(['$routeProvider',  function ($routeProvider) {
        $routeProvider
          .when('/customers', {
            templateUrl : "views/customers/customers.html",
            controller : "CustomersCtrl"
          })

        $routeProvider.otherwise('/customers')
    }]);
