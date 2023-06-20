const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
     user: 'root',
     password: 'sarvesh@1998',
     database: 'master'
   });
 
 
 
  connection.connect((err)=>{
       if(err){
         console.log(err.message)
  }else{
       console.log("succesfully done")
      }
  });



  module.exports =connection


