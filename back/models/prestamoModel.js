'user strict';
var sql = require('./db.js');

var Task = function(task){
  this.task = task.task;
  this.status = task.status;
  this.created_at = new Date();
};



Task.getAllTask = function (result) {
  sql.query("Select * from tasks", function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
            console.log('tasks : ', res);  

           result(null, res);
          }
      });   
};

module.exports= Task;


/* 


function prestamo(sql) {

  return new Promise(async function(resolve, reject) {

    let conn; // Declared here for scoping purposes.

    try {

      conn = await mysqldb.getConnection();

      console.log('Connected to database');

      let result = await conn.execute(

        `select *

        from employees

        where employee_id = :emp_id`,

        [empId],

        {

          outFormat: mysqldb.OBJECT

        }

      );

      console.log('Query executed');

      resolve(result.rows[0]);

    } catch (err) {

      console.log('Error occurred', err);

      reject(err);

    } finally {

      // If conn assignment worked, need to close.

      if (conn) {

        try {

          await conn.close();

          console.log('Connection closed');

        } catch (err) {

          console.log('Error closing connection', err);

        }

      }

    }

  });

} */

//module.exports.prestamo = prestamo;