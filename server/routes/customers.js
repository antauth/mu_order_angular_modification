var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';

router.get('/', function(req, res) {

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      res.sendStatus(500);
    }

    client.query(
      'SELECT customers.id, customers.first_name, customers.last_name, count(orders.total) FROM customers ' +
      'LEFT JOIN addresses on customers.id = addresses.customer_id ' +
      'LEFT JOIN orders on addresses.id = orders.address_id ' +
      'GROUP BY customers.id, customers.last_name, customers.first_name ' +
      'ORDER BY customers.last_name, customers.first_name;',
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
