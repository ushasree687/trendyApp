var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    req.session.isLoggedin = false;
    var responseData = {
        isUserLoggedin: false
    }
    res.send(JSON.stringify(responseData));
});

module.exports = router;
