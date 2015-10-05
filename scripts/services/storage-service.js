angular.module("CustomerMgmt")
    .service("Storage",['$window',function($window){

        this.set = function(key, value){
            value = typeof  value !== "string" ?  JSON.stringify(value) : value;
                $window.localStorage.setItem(key, value);
        };

        this.get = function(key){
            var data = $window.localStorage.getItem(key);
            return data? JSON.parse(data) : null;
        };


        this.remove = function(key){
            $window.localStorage.removeItem(key);
        }


    }]);
