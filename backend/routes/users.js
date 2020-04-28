var express = require('express');
var router = express.Router();
var User = require("../models/User");
var bcrypt = require("bcrypt");
var validator = require("validator");
var Web3 = require('web3');
var config = require("../cryptoConfig");
var web3 = new Web3(new Web3.providers.HttpProvider(config.httpProvider));

User.find().then(data => {
  console.log(data, "all users");
})

// User registration
router.post('/register', function (req, res, next) {
  const userData = req.body;
  if (!validator.isEmail(userData.email)) {
    return res.send("invalid email")
  }
  bcrypt.hash(req.body.password, 10, function (err, hash) {

    var account = web3.eth.accounts.create();
    if (account) {

      console.log(account)
      var user = new User({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: hash,
        address: userData.address,
        userType: userData.userType,
        publicKey: account.address,
        privateKey: account.privateKey,
        active: true
      })
      user.save(function (err) {
        if (err) {
          if (err.name === 'MongoError' && err.code === 11000) {
            // Duplicate username
            return res.status(200).send({ succes: false, message: 'User already exist!' });
          }

          // Some other error
          return res.status(422).send(err);
        }

        res.send({
          success: true,
          message: "User Created",
          data: user
        });

      });
    }
    else {
      res.send({
        success: false,
        message: "User not created,Try again!"
      })
    }
  });

});

router.post("/login", function (req, res) {
  const userData = req.body;

  User.findOne({
    email: userData.email
  }).then(function (user) {
    console.log(user)
    if (!user) {
      res.send("Not a valid email");
    } else {
      bcrypt.compare(userData.password, user.password, function (err, result) {
        if (result) {
          console.log("successfull login")
          res.send({
            success: true,
            data: user
          })
        } else {
          res.send({
            success:false,
            message:"Incorrect Password"
          });

        }
      });
    }
  });
})


module.exports = router;