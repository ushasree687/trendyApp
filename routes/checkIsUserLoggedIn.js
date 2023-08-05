var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
    var responseData = {
        isUserLoggedin: false
    }
    if (req.session.isLoggedin) {
        responseData.isUserLoggedin = req.session.isLoggedin;
    }

    res.send(JSON.stringify(responseData));
});

module.exports = router;
