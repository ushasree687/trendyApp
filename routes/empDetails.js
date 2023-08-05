var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    console.log(req.body);
    console.log(req.query);
    //var empId = req.body.empId;
  var empData = [
    {
        name: 'Raj',
        age: 50,
        gender: 'Male',
        location: 'Hyderabad',
        department: 'IT',
        id: 'emp_01'
    },
    {
        name: 'Meena',
        age: 55,
        gender: 'Male',
        location: 'Pune',
        department: 'Finance',
        id: 'emp_04'
    },
    {
        name: 'Krish',
        age: 44,
        gender: 'Male',
        location: 'Mumbai',
        department: 'HR',
        id: 'emp_08'
    },
    {
        name: 'Teena',
        age: 33,
        gender: 'Male',
        location: 'Chennai',
        department: 'IT',
        id: 'emp_10'
    }
  ];

  var resObj = [];
  if (req.body.empId) {
    empData.forEach((details) => {
        if (details.id == req.body.empId) {
            resObj.push(details)
        }
    });
  } else {
    resObj = empData;
  }
  res.send(JSON.stringify(resObj));
});

module.exports = router;
