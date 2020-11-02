'user strict';

var mysql = require('mysql');
var util = require('util');

var connection = mysql.createConnection({
  host     : 'us-cdbr-east-02.cleardb.com',
  port     : '3306',
  user     : 'bfcf921ad2d1d9',
  password : '547c03ba',
  database : 'heroku_2309d2c344b6aa6'
});

connection.config.queryFormat = function (query, values) {
  if (!values) return query;
  return query.replace(/\:(\w+)/g, function (txt, key) {
    if (values.hasOwnProperty(key)) {
      return this.escape(values[key]);
    }
    return txt;
  }.bind(this));
};

connection.query = util.promisify(connection.query);
module.exports = connection;


