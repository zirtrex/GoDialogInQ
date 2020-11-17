const util = require('util');
const mysql = require('mysql');

const config = require('config');

const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_ROOT_PASSWORD,
  MYSQL_DATABASE,
  MYSQL_PORT
} = process.env;

console.log(process.env);

var pool = mysql.createPool({
    connectionLimit: 10,
    host     : MYSQL_HOST,
    port     : MYSQL_PORT,
    user     : MYSQL_USER,
    password : MYSQL_ROOT_PASSWORD,
    database : MYSQL_DATABASE,
    charset: "utf8_general_ci"
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log(err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
  }

  if (connection) {
    //console.error(connection);
    connection.release();
  }

  return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;

/*
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

connection.end();

module.exports = connection;*/