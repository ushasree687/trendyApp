var express = require('express');
var router = express.Router();
const multer  = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/images/productImages');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, callback) { 
        file_path = "prodImg_" + Date.now() + path.extname(file.originalname);
        // file_path = file.originalname;
        callback(null, file_path);
    }
});

var upload = multer({ storage: storage}).single('prodImage');

/* POST home page. */
router.post('/', function(req, res, next) {
    var resObj  = {};
    upload(req, res, function(err) {
        if (err) {
            resObj.msg = "ERROR"
            console.log(err);
        } else {
            resObj.file_path = '/images/productImages/' + file_path;
            resObj.msg = 'success';
        }
        res.send(JSON.stringify(resObj));
    });
});

module.exports = router;
