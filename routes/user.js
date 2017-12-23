//=========================================
//Get required modules ====================
//=========================================
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
//Get User model 
var User = require('../models/user');

//=========================================
//Create User =============================
//=========================================

router.post('/', function(req, res){
    var user = new User({
        firstName:req.body.firstName,
        lastName :req.body.lastName,
        password:bcrypt.hashSync(req.body.password, 10),
        email:req.body.email
    })
    user.save(function(err,user){
        if(err){
            return res.status(500).json({
                title:"An error Occured",
                error:err
            })
        }
        res.status(201).json({
            message:"User Created",
            obj:user
        })
    })
})

//=========================================
// User Login =============================
//=========================================
router.post('/signin', function(req, res, next){
    console.log(req.body)

    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });
    });    
});

module.exports = router;