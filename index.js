const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 
// parse application/json
app.use(bodyParser.json());
 
//creating database connection with a mysql server Db in phpMyAdmin
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rest_api_db'
});
 
//Getting server validation to check whether nodeJs BE is connected with mysql server or not
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected successfully');
});
 
//fetch all data from product table
// fetch api call for product Table:  --> http://localhost:3000/getproducts
app.get('/getproducts',(req, res) => {
  let sql = "SELECT productId,productName,qtyPerUnit,unitPrice,unitInStock, discontinued,categoryName FROM product inner join category as cat where product.categoryId=cat.categoryId";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//fetch all data from category table
// fetch api call for category Table:  --> http://localhost:3000/getcategory
app.get('/getcategory',(req, res) => {
    let sql = "SELECT * FROM category";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

// insert api call for Category Table --> http://localhost:3000/insertproductcategory
app.post('/insertproductcategory',(req, res) => {
    let data = {categoryName: req.body.categoryName};
    let sql = "INSERT INTO category SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

//show single product
// read api call for product Table: --> http://localhost:3000/particularproduct
app.get('/particularproduct/:id',(req, res) => {
    let sql = "SELECT productId,productName,qtyPerUnit,unitPrice,unitInStock, discontinued,categoryName FROM product inner join category as cat where product.categoryId=cat.categoryId and productId="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
 
//add new data to product table via api
// insert api call for product Table: --> http://localhost:3000/insertproduct
app.post('/insertproduct',(req, res) => {
  let data = {productName: req.body.productName, qtyPerUnit: req.body.qtyPerUnit, unitPrice: req.body.unitPrice, unitInStock: req.body.unitInStock,discontinued: req.body.discontinued,categoryId: req.body.categoryId};
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//update entry via api call
// update api call for product Table: --> http://localhost:3000/updateproduct/2
app.put('/updateproduct/:id',(req, res) => {
  let sql = "UPDATE product SET productName='"+req.body.productName+"', qtyPerUnit='"+req.body.qtyPerUnit+"',unitPrice='"+req.body.unitPrice+"',unitInStock='"+req.body.unitInStock+"',discontinued='"+req.body.discontinued+"',categoryId='"+req.body.categoryId+"' WHERE productId="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Delete entry from product table via api call
//delete api call for product Table: --> http://localhost:3000/deleteproduct/1
app.delete('/deleteproduct/:id',(req, res) => {
  let sql = "DELETE FROM product WHERE productId="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//message to show server running in a which port 
app.listen(3000,() =>{
  console.log('Node server running on port 3000...');
});