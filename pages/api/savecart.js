
export default function handler(req, res) {

    console.log("savecart.js api page called...");
   
    console.log("looking at the variables");
    console.log(req.body);
  
   
    const cart= JSON.stringify(req.body.cart);
    
  
    // db
    // get the client
    const mysql = require('mysql2');
  
    // create the connection to database
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      port: 3306,
      database: 'test'
    });
  
  
    // simple query
  connection.query(
    //"SELECT * FROM users WHERE username = '"+username+"' AND pass = '"+pass+"' LIMIT 1;",
    "INSERT INTO `test`.`orders` ( `productids`) VALUES ('1', '0', 'xxxx', '0');",
    function(err, results, fields) {
   
    
        res.status(200).json("ok");
  
      
    }
  );

  }