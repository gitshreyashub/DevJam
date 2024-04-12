/*var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json)
app.use(express.static('public'))
app.use (bodyParser.urlencoded({
    extended:true
}))
mongoose.connect('mongodb://localhost:27017/Databse')
var db=mongoose.connection
db.on('error',()=>console.log("error in connecting to database"))
db.once('open',()=>console.log("connected to database"))
app.post("/signup",(req,res)=>{
    var name = req.body.name
    var email= req.body.email
    var mobile=req.body.mobile
    
    var data ={
        "name":name,
        "email":email,
        "mobile":mobile,
    }
   
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err
        }
        console.log("data inserted succesfullyy")
    })
    return res.redirect('signup_success.html')
})





app.get("/",(req,res)=>{
    res.set({
        "Access-Control-Allow-Origin": "*"
    })
    return res.redirect('index.html')
}).listen(3000);
console.log("listening on port 3000");*/


var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/Database');
var db = mongoose.connection;
db.on('error', () => console.log("error in connecting to database"));
db.once('open', () => console.log("connected to database"));

app.post("/signup", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var mobile = req.body.mobile;

    var data = {
        "name": name,
        "email": email,
        "mobile": mobile
    };

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("data inserted successfully");
        return res.redirect('signup_success.html');
    });
});

app.get("/", (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "*"
    });
    return res.redirect('index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});

