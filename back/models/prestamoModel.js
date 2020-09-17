const mysqldb = require('mysql');

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

}

module.exports.prestamo = prestamo;