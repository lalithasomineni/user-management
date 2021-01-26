const {User, validate} = require('../models/User');
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

router.get("/",(req,res)=>{
    User.paginate().then(result=>{
        res.send(result);
    }).catch(err=>{
        res.send(err);
    })
})

router.get("/bydate",(req,res)=>{
     User.find({
        createdDate: {
            $gte: new Date(req.query.date)
        }
    }).then(result=>{
      res.send(result);
    }).catch(err=>{
        res.send(err);
    })
});
router.get("/byrole",(req,res)=>{
   User.findOne({role: req.query.role}).then(result=>{
       res.send(result);
   }).catch(err=>{
       res.send(err);
   })
});

router.get("/byrole/bydate",(req,res)=>{
    User.find({
        role:req.query.role,
        createdDate : {
            $gte : new Date(req.query.date)
        }
    }).then(result=>{
        res.send(result);
    }).catch(err=>{
        res.send(err);
    })
})

router.post('/', async (req, res) => {
    user = new User({
        _id: new mongoose.Types.ObjectId(),
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        role: req.body.role,
        createdDate:req.body.createdDate,
        updatedDate: req.body.updatedDate
    }) 
   const salt = await bcrypt.genSalt(14)
   user.password = await bcrypt.hash(user.password,salt);
   user.save().then(result=>{
       res.send(result);
   }).catch(err=>{
       res.send(err);
   })
});
module.exports = router;