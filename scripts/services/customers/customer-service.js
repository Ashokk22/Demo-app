angular.module("CustomerMgmt")
    .service("CustomerSV",['$http','$q','Storage','CustomerCNST', function($http, $q, Storage, CustomerCNST){

        this.all = function(){
            var defer = $q.defer();
            var customers = Storage.get('customers');
            if(customers){
                defer.resolve(customers)
            }else{
                $http.get(CustomerCNST.getCustomers)
                    .success(function(response){
                        defer.resolve(response.customers)
                        Storage.set('customers', response.customers);
                    })
                    .error(function(){
                        defer.reject("Some error")
                    })
            }
            return defer.promise;
        };

        this.add = function(customer){
            var defer = $q.defer();
            var customers = Storage.get('customers');
            customers.push(customer)
            Storage.set('customers', customers);
            defer.resolve(customers)
            return defer.promise;

        };

        this.remove = function(id){
            var defer = $q.defer();
            var customers = Storage.get('customers');
            var customers = customers.filter(function(customer){
                  return  customer.id != id
            });

            customers.length ? Storage.set('customers', customers) : Storage.remove('customers');

            defer.resolve(customers);
            return defer.promise;
        };


    }]);
