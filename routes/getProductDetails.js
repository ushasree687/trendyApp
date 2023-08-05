var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");

const client = new MongoClient('mongodb://127.0.0.1:27017');
/* GET Products List */
router.get('/', function(req, res, next){
     console.log("req.session.isLoggedin -> " + req.session.isLoggedin);
    connectToDb()
          .then((document) => {
               if (document.length) { //Not 
                 res.send(JSON.stringify(document));
               }
          })
          .catch(console.error)
          .finally(() => {
               //client.close();
               console.log("finally done")
          });    
});


async function connectToDb() {
    // Use connect method to connect to the server
    await client.connect();    
    const db = client.db("tredningFashionStore");

    const collection = db.collection('productDetailsList');
    // var result = collection.find({}).toArray();
    var result = collection.find().toArray();
    return result;
    
}

module.exports = router;
