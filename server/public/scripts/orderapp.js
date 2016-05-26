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
      $scope.orderList = splitUpOrders(data);
    });

    // <p>Deliver To: {{order.address_type}}</p>
    // <p>Address: {{order.street}}, {{order.city}} {{order.state}} {{order.zip}}</p>
    // <p>Order Number: {{order.order_id}} - Order Date: {{order.order_date | date}}</p>
    // <p>Product: {{order.description}} - Qty: {{order.quantity}} - Price: {{order.unit_price | currency}}</p>
    // <p>Order total: {{order.unit_price * order.quantity | currency}}</p>

    function splitUpOrders(orderList) {
      var orders = [];
      var currentOrderId = orderList[0].order_id;
      var theOrder = {
        order_id: currentOrderId,
        lineItems: []
      };
      var count = 0;
      orderList.forEach(function (order) {
        count++;
        if (order.order_id == currentOrderId) {
            theOrder.lineItems.push(order);
        } else {
          orders.push(theOrder);
          currentOrderId = order.order_id;
          theOrder = {
            order_id: order.order_id,
            lineItems: []
          }
          theOrder.lineItems.push(order);
        }
        if (orderList.length == count) {
          orders.push(theOrder);
        }

      });
      return orders;
    }
  }







}]);
