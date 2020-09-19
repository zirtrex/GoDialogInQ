'user strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'godialoginq',
    password : 'godialoginq',
    database : 'godialoginq'

});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;

