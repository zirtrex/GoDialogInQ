var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();

var log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'debug' } }
});
const logger = log4js.getLogger('cheese');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get("/", (req, res) => {	
	res.json({
		"godialoginq-back": "v1.0.0"
	});    
});

module.exports = router;