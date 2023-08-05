var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const http = require('http');
const { SocketIO } = require("socket.io");
var cluster = require("cluster")

var os = require("os");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var validateUserCredentials = require("./routes/validateUserLogin");
var newSignupRouter = require("./routes/newUserSingup");
var getProductDetailsRouter = require("./routes/getProductDetails");
var addNewProductRouter = require("./routes/addNewProductDetails");
var uploadRouter = require("./routes/uploadResource");
var logincheckRouter = require("./routes/checkIsUserLoggedIn");
var logoutRouter = require("./routes/logoutSession");
var empRouter = require("./routes/empDetails");
var studentDetailsRouter = require("./routes/studentDetails");

var addItemToCartRouter = require("./routes/addItemtoCart");

var app = express();
if (cluster.isMaster) {
     for (var i = 0; i < os.cpus().length; i++) {
          cluster.fork();    
     }     
} else {

     app = express();


     const server =  http.createServer(app);
     var io = require('socket.io')(server);
     var noOfConnections = 0;
     io.on('connection', (socket) => {
     noOfConnections++;
     console.log("Total no. of current connections " + noOfConnections);  
     socket.on('disconnect', () => {
          noOfConnections--;
          console.log("Total no. of current connections " + noOfConnections)
     });


     socket.on("user_send_msg", (data) => {
          console.log("DATa received " + data);
          socket.broadcast.emit("receive_msg", data);
     })
     });

     app.use(session({
     secret: 'alkdjfa;lksdf',
     resave: false,
     saveUninitialized: true
     }));

     // view engine setup
     app.set('views', path.join(__dirname, 'views'));
     app.set('view engine', 'jade');

     app.use(logger('dev'));
     app.use(express.json());
     app.use(express.urlencoded({ extended: false }));
     app.use(cookieParser());


     app.use(express.static(path.join(__dirname, 'public')));

     server.listen(3000, () => {
          console.log("Server is listing at 3000 " + " At process id " + process.pid);
     });


     app.use('/', indexRouter);
     app.use('/users', usersRouter);
     app.use("/validate/userCredentials", validateUserCredentials);
     app.use("/get/productDetails", getProductDetailsRouter);
     app.use("/add/newUser/details", newSignupRouter);
     app.use('/add/newProductDetails', addNewProductRouter);
     app.use("/resource/fileUpload", uploadRouter);
     app.use("/check/userlogin", logincheckRouter);
     app.use("/user/logout", logoutRouter);
     app.use("/get/empDetails", empRouter);
     app.use("/get/StudentDetails", studentDetailsRouter);
     app.use("/add/item/toCart", addItemToCartRouter)

     // catch 404 and forward to error handler
     app.use(function(req, res, next) {
     next(createError(404));
     });

     // error handler
     app.use(function(err, req, res, next) {
     // set locals, only providing error in development
     res.locals.message = err.message;
     res.locals.error = req.app.get('env') === 'development' ? err : {};

     // render the error page
     res.status(err.status || 500);
     res.render('error');
     });
}

module.exports = app;

