var express = require('express');
var router = express.Router();
var {MongoClient} = require("mongodb");

var mongoClient = new MongoClient("mongodb://127.0.0.1:27017");

/* GET home page. */
router.post('/', function(req, res, next) {
    
    var resObj = {};
    getDbConnection(req.body)
      .then(() => {
        resObj.msg = 'Inserted';
        res.send(JSON.stringify(resObj));
      }).catch((error) => {
        resObj.msg = 'Error';
        res.send(JSON.stringify(resObj));
      }).finally(() => {
        //client.close();
      });
});

async function getDbConnection(data) {
  try {
      await mongoClient.connect();
      console.log("called")
      // tredningFashionStore.productDetailsList
      var db = mongoClient.db("tredningFashionStore");
      var collection = db.collection('productDetailsList');
      collection.insertOne(data, () => {
        console.log("data inserted")
        return 'done';
      });
    } catch(e) {
      console.log("error");
      console.log(e);
    }
  }
  

module.exports = router;
