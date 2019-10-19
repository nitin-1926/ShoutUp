var express = require('express')
var path = require('path')
var app = express()
// var ejs = require('ejs')
// var session = require('express-session')
// var nodemailer = require('nodemailer');
// var multer = require('multer');

app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//app.use(session({
//     secret: "GirlScript",
//     resave: false,
//     saveUnintialized: true,
//   }))

  app.use(function (req, res, next) {
    next()
  })

var mongoose = require('mongoose');
var schema = mongoose.Schema;
var ngodb = 'mongodb://localhost/NGOs';

mongoose.connect(ngodb);

mongoose.connection.on('error',(err) => {
  console.log('DB connection Error');
})

mongoose.connection.on('connected',(err) => {
    useNewUrlParser: true;
   console.log('DB connected');
 })

 var ngoSchema = new mongoose.Schema({
    ngoname: String,
    email: String,
    NGOLocation: String,
    ngoaddress: String,
    ngophone: String,
    NGOIssues: String,
})

var VictimSchema = new mongoose.Schema({
  
})

console.log("HELLO WORLD");

var ngo = mongoose.model('ngo', ngoSchema);
var victim = mongoose.model('victims',VictimSchema);

app.post('/addNgo',function(req,res)
{
  console.log("POST CALLED");
  var obj = req.body;
  console.log(obj);
  ngo.create(obj,function(error,result)
  {
    if(error)
    throw err;
    else
    {
    // var transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.PASSWORD
    //   }
    // });

    // var mailOptions = {
    //   from: 'hack7jack@gmail.com',
    //   to: req.body.username,
    //   subject: 'Welcome To CQ',
    //   text: "Your Username is: " + req.body.username + "\n" + " Password is: " + req.body.password + "\n" + " Hope your Journey goes smooth."
    // };

    // transporter.sendMail(mailOptions, function(error, info){
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.res);
    //   }
    //});
      console.log("NGO Added");
      res.sendFile(path.join(__dirname + '/public/index.html'));  }
    })
})



app.listen(3000,function()					//Server Running Confirmation
{
      console.log("Running on port 3000");
});
