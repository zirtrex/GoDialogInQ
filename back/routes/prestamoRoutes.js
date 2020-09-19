'use strict';

module.exports = function(app) {
  
  var prestamoController = require('../controllers/prestamoController.js');

  // todoList Routes
  app.route('/dialogflow')
  
    .get(prestamoController.list_all_tasks);
   
    };
    