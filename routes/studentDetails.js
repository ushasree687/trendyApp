var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  var studentData = {
    sData: [
      {
        name: 'Teena',
        location: 'Hyderabad',
        age: 20,
        avg: 86.5,
        address: {
          dno: '45/A'
        }
      },
      {
        name: 'Teena',
        location: 'Hyderabad',
        age: 20,
        avg: 86.5,
        address: {
          dno: '45/A'
        }
      },
      {
        name: 'Raj',
        location: 'Hyderabad',
        age: 20,
        avg: 86.5,
        address: {
          dno: '45/A'
        }
      },
      {
        name: 'Krish',
        location: 'Hyderabad',
        age: 20,
        avg: 86.5,
        address: {
          dno: '45/A'
        }
      }
    ]
  };
  // res.send(JSON.stringify(studentData));
  res.render('sdetails', studentData);
});

module.exports = router;
