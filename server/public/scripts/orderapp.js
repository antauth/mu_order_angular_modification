var application = angular.module('myApp', []);

application.controller('CustomerList', ['$scope', '$http', function($scope, $http) {

  console.log('angular controller!');

  $scope.customerList = [];

  $scope.getCustomers = function() {
    $http({
      method: 'GET',
      url: '/customers'
    }).then(function(res) {
      var data = res.data;
      console.log(data);
      $scope.customerList = data;

    });
  }

  $scope.getOrders = function(id) {
    $http({
      method: 'GET',
      url: '/orders/' + id
    }).then(function(res) {
      var data = res.data;
      console.log(data);
      $scope.orderList = data;

    });
  }







}]);
