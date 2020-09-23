
'use strict';

var Task = require('../models/prestamoModel.js');

exports.list_all_tasks = function(req, res) {
  Task.getAllTask(function(err, task) {

    console.log('controller');
    if (err) res.send(err);
    
    console.log('res', task);
    res.send(task);
  });
};
