var mysql=require('mysql');
var connection=mysql.createPool({
 
host:'localhost',
 user:'root',
 password:'y8loe9evCz7sDaKTAO#RrWOw',
 database:'coinexchange'
 
});
 module.exports=connection;