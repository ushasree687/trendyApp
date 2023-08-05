var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");
const bcrypt = require('bcrypt');
const saltRounds = 5;
const publicKey = 'My private Key';

const client = new MongoClient('mongodb://127.0.0.1:27017');

/* POST home page. */
router.post('/', function(req, res, next) {
     req.session.accountId = '';
     console.log("Getting response from process " + process.pid)
     var responseObj = {};
     
     connectToDb(req.body)
          .then((document) => {
               if (document.length) { //Not zero
                    bcrypt.compare(req.body.password, document[0].password, function(err, result) {
                         if (result) {
                              req.session.isLoggedin = true;
                              req.session.accountId = req.body.accountId;
                              console.log("req.session");
                              //console.log(req.body);
                              console.log(req.session.accountId);
                              responseObj.msg = 'Valid';
                              responseObj.userType = document[0].userType;
                         } else {
                              req.session.isLoggedin = false;
                              responseObj.msg = 'Invalid';
                              responseObj.error = 'Invalid Password';
                         }
                         res.send(JSON.stringify(responseObj));
                    });
                    
               } else {
                    responseObj.msg = 'Invalid';
                    responseObj.error = 'Invalid User ID';
                    res.send(JSON.stringify(responseObj));
               }
          })
          .catch(console.error)
          .finally(() => {
               //client.close();
               console.log("finally done")
          });
 
});

async function connectToDb(reqData) {
     // Use connect method to connect to the server
     await client.connect();    
     const db = client.db("tredningFashionStore");

     const collection = db.collection('userAccountDetails');
     // var result = collection.find({}).toArray();
     var result = collection.find({accountId: reqData.accountId}).toArray();
     return result;     
 }

module.exports = router;
