'use strict';

module.exports = function(app) {
  
  var prestamoController = require('../controllers/prestamoController');

  // todoList Routes
  app.route('/dialogflow').get(prestamoController.list_all_tasks);
   
};
    