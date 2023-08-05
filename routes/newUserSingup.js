var express = require('express');
var router = express.Router();
var {MongoClient} = require("mongodb");
const bcrypt = require('bcrypt');
const saltRounds = 5;
const publicKey = 'My private Key';

var client = new MongoClient("mongodb://127.0.0.1:27017");
/* GET home page. */
router.post('/', function(req, res, next) {
  var resObj = {};
  var reqObj = req.body;
  bcrypt.hash(reqObj.password, saltRounds, function(err, hash) {
    console.log("Encrypted pwd is " +hash );
    reqObj.password = hash;
    getDbConnection(reqObj)
      .then(() => {
        resObj.msg = 'Inserted';
        res.send(JSON.stringify(resObj));
      }).catch((error) => {
        resObj.msg = 'Error';
      }).finally(() => {
        //client.close();
      })
  });
});

async function getDbConnection(data) {
  
  await client.connect();
  var db = client.db("tredningFashionStore");
  var collection = db.collection('userAccountDetails');
  collection.insertOne(data, () => {
    console.log("data inserted")
  })
  return 'done';
}

module.exports = router;
