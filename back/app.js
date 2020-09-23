require('events').EventEmitter.prototype._maxListeners = 0;
var express = require('express');
var http = require('http');

//var router = express.Router();

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

/* 
const index = require('./routes/index');
var modulo = require('./routes/modulo');
var show = require('./routes/show');
 */

var app = express();
var server = http.Server(app); //createServer
var debug = require('debug')('myapp:server');

app.use(methodOverride("_method"));

var COOKIE_SECRET = 'secretencode';
var COOKIE_NAME = 'sid';

var port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


//app.use('/', index);
//app.use('/modulo', modulo);
//app.use('/show', show);

//app.listen(port);

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


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
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

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}



module.exports = app;