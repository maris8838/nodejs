const express = require('express');
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/geoLocation');
const {Artist} = require('./model/artist');
const {Category} = require('./model/category');
const {Country} = require('./model/country');
const {State} = require('./model/state');
const {User} = require('./model/user');

app.use(cors({
    origin : "http://localhost:4200"
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

function isLoggedIn(req,res,next){
    // console.log(req.headers['authorization']);
    // next();
    jwt.verify(req.headers['authorization'],'thisIsSecret',function(err,decoded){
        if(decoded){
            next()
        }else{
            res.status(401).json({
                message : "Unauthorized"
            })
        }
    })
}

app.get('/',function(req,res){
    res.json({
        message : "Success"
    });
});

app.post('/artist',function(req,res){

    let artist = new Artist({
        name : req.body.name,
        films : req.body.films,
        categoryId : req.body.categoryId
    });

    artist.save().then(function(artist) {
        res.json({
            message : "Success"
        })
    },function(error){
        console.log(error);
    })

    
})

app.get('/artist',function(req,res){
    Artist.find()
    .populate('categoryId')
    .then(function(response){
        res.json(response);
    },function(err){
console.log(err);
    })
});


app.post('/category',function(req,res){

    let category = new Category({
        name : req.body.name
    });

    category.save().then(function(artist) {
        res.json({
            message : "Success"
        })
    },function(error){
        console.log(error);
    })

    
})


app.get("/artist",function(req,res){
    Artist.find().then(function (response){
res.json(response);
    },function(error){
        console.log(error);
    })
})


app.get('/state/:countryId',function(req,res){
    State.find({"countryId":req.params.countryId}).then(function(response){
        res.json(response);
    },function(err){
        console.log(err);
    })
});

app.post('/register',function (req,res) {
    let user = new User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    })

    bcrypt.hash(req.body.password, 10, function(err, hash) {
        console.log(hash);
        // Store hash in your password DB.
        let user = new User({
            name : req.body.name,
            email : req.body.email,
            password : hash
        });

        user.save().then(function(userData) {
        res.json({
            message : "User Created Successfuly!"
        })
    },function(err){
        res.json({
            message : "Sorry Something Went Wrong"
        })
    })
      });

    
});


app.post('/login',function(req,res){
    User.findOne({"email":req.body.email}).then(function(response){
        console.log(response)
        bcrypt.compare(req.body.password, response.password, function(err, bcryptRes) {
            // res == true
            console.log(bcryptRes)
            if(bcryptRes == true){
                var token = jwt.sign({ name: response.name }, 'thisIsSecret');
                res.json({token });
            }
        });
    },function(err){
        console.log(err);
    })
});

app.get('/dashboard',isLoggedIn,function(req,res){
    Country.find().then(function(response){
        res.json(response);
    },function(err){
        console.log(err)
    })
})

app.listen(8000,function(){
    console.log('Port listen in 8000')
});