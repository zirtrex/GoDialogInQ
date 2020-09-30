/* require('events').EventEmitter.prototype._maxListeners = 0;
var express = require('express');
var http = require('http');

var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var Modulo = require('./models/prestamoModel').Modulo;
var log4js = require('log4js');

log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'debug' } }
});

const logger = log4js.getLogger('cheese');


var app = express();
var server = http.Server(app); //createServer
var debug = require('debug')('myapp:server');

app.use(methodOverride("_method"));

var COOKIE_SECRET = 'secretencode';
var COOKIE_NAME = 'sid';

var port = normalizePort(process.env.PORT || '8081');
app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/prestamoRoutes'); //importing route

routes(app); //register the route
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.pug');
});

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

module.exports = app; */






const express = require('express');
const app = express();

//imports
const tipoprestamoRoutes = require('./routes/tipoprestamoRoutes');
const requisitoRoutes = require('./routes/requisitoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');




//settings
app.set('port', 8081);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



//routes
app.use(tipoprestamoRoutes);
app.use(requisitoRoutes);
app.use(clienteRoutes);


//run
app.listen(app.get('port'), () => {
    console.log('Server on Port 8081')
})


