var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';

router.get('/:id', function(req, res) {

  var id = req.params.id;

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      res.sendStatus(500);
    }

    client.query(
      'SELECT addresses.customer_id, addresses.street, addresses.city, ' +
      'addresses.state, addresses.zip, addresses.address_type, ' +
      'line_items.order_id, orders.order_date, line_items.quantity, ' +
      'products.unit_price, products.description FROM customers ' +
      'JOIN addresses ON customers.id = addresses.customer_id ' +
      'JOIN orders ON addresses.id = orders.address_id ' +
      'JOIN line_items ON orders.id = line_items.order_id ' +
      'JOIN products ON products.id = line_items.product_id ' +
      'WHERE customers.id = $1 ' +
      'ORDER BY orders.id, orders.order_date ASC;', [id],
      function(err, result) {
        done();

        if (err) {
          res.sendStatus(500);
        }

        res.send(result.rows);

      }
    );
  });
});

module.exports = router;
