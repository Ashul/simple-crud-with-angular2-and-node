//=========================================
//Get required modules ====================
//=========================================
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

//Get message model from models folder
var Message = require('../models/message');
var User = require('../models/user');
//=========================================
//Get All messages  =======================
//=========================================
router.get('/', function(req,res,next){
    Message.find()
           .populate('user', 'firstName')
           .exec(function(err, message){
               if(err){
                   return res.status(500).json({
                       title:"An error Ocuured",
                       error:err
                   })
               }
               res.status(200).json({
                   message:"sucess",
                   obj:message
               })
           })
})


//=========================================
//Authenticate all route below ============
//=========================================
router.use('/', function(req, res, next){
    jwt.verify(req.query.token, 'secret', function(err, decoded){
        if(err){
            return res.status(401).json({
                title:"Not Authenticatied",
                error:err
            })
        }
        next()
        
    });
    
});

//=========================================
//Create message  =========================
//=========================================

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var message = new Message({
            content: req.body.content,
            user: user
        });
        message.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            console.log(result)
            // console.log(user.messages.push(result))
            
             //user.messages.push(result);
            // user.save();
            res.status(201).json({
                message: 'Saved message',
                obj: result
            });
        });
    });
});


//=========================================
//Get Single message  =====================
//=========================================
router.get('/:id', function(req,res,next){
    console.log(req.params.id)
    Message.findById(req.params.id)
           .exec(function(err, result){
               if(err){
                   return res.status(500).json({
                       title:'An error Occured',
                       error:err
                   })
                }
                   res.status(200).json({
                       message:'sucess',
                       obj:result
                   })
               
           })
})

//=========================================
//Update a message ========================
//=========================================
router.patch('/:id', function(req, res){
    Message.findById(req.params.id, function(err, message){
        if(err){
            return res.status(500).json({
                title:"An error Occured",
                error: err
            })
        }
        else if(!message){
            return res.status(500).json({
                title:"No message found",
                error:{message:"Message not Found"}
            })
        }
        console.log(message.content)
        console.log(req.body.content)
        message.content = req.body.content
        message.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title:"An error occured",
                    error:err
                })
            }
            res.status(200).json({
                message:"Message Updated",
                obj:result
            });
        });
    });
});

//=========================================
//Delete a message ========================
//=========================================
router.delete('/:id', function(req, res){
    Message.findById(req.params.id, function(err, message){
        if(err){
            res.status(500).json({
                title:"An error occured",
                error:err
            })
        }
        message.remove(function(err, result){
            if(err){
                res.status(500).json({
                    title:"An error occured",
                    error:err
                })
            }
            res.status(200).json({
                message:"Message Deleted"
            })
    
        })
    })
})

//=========================================
//Export router ===========================
//=========================================
module.exports = router;