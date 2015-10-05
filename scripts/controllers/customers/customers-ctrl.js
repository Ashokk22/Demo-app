angular.module("CustomerMgmt")
  .controller("CustomersCtrl",['$http', '$scope','$modal','CustomerSV', function($http, $scope, $modal, CustomerSV){

      $scope.newCustomer = {};

      $scope.selectCustomer = _selectCustomer;

      $scope.addCustomer = _addCustomer;

      $scope.saveCustomer = _saveCustomer;

      $scope.canceSave  = _cancelSave;

      $scope.removeCustomer =_removeCustomer;


      _initialize();


      function _initialize(){
        CustomerSV.all()
            .then(function(customers){
              $scope.customers = customers;
              $scope.counter = $scope.customers.length ? $scope.customers[$scope.customers.length -1].id : 0;
              $scope.selectCustomer();
            }, function(){

            });
      }

      function _addCustomer(){
        $scope.addCustomerModal = $modal.open({
          templateUrl: 'views/customers/add-customer.html',
          controller: ['$scope', function(scope){
            $scope.counter++;
            scope.newCustomer = $scope.newCustomer;
            scope.newCustomer.name = '';
            scope.newCustomer.emailId = '';
            scope.newCustomer.location = '';
            scope.newCustomer.id =$scope.counter;
            scope.saveCustomer = _saveCustomer;
            scope.cancelSave = _cancelSave;
          }]
        });


      };

      function _selectCustomer(id){
        $scope.selectedCustomer = id ?  $scope.customers.filter(function(customer){return customer.id == id;})[0] : $scope.customers[0];
      };


      function _saveCustomer(form){
        if(form.$valid){
          CustomerSV.add($scope.newCustomer).then(function (customers) {
            $scope.customers = customers;
          });
          $scope.addCustomerModal.close();
        }
      }

      function _cancelSave(){
        $scope.addCustomerModal.dismiss('cancel');
      }

      function _removeCustomer(id){
        CustomerSV.remove(id).then(function(customers){
          $scope.customers = customers;
        });
      }





  }]);
