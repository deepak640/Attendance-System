var express = require('express');
var router = express.Router();
const User = require("../model/user");
const bcrypt = require('bcryptjs');
const Contact = require('../model/contact');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post("/Register", async (req, res) => {
  const { Fac_ID, Fac_Name, Department, Phone_no, Email, Password, courses } = req.body
  if (!Fac_ID || !Fac_Name || !Department || !Phone_no || !Email || !Password) {
    res.status(400).json({
      Error: "Please Fill Data Now"
    })
  }
  try {
    const Exist = await User.findOne({ Email: Email });
    const ID = await User.findOne({ Fac_ID: Fac_ID });
    if (Exist || ID) {
      return res.status(422).json({ Error: "Email or ID already exist" });
    }
    if (Password.match(/[a-z]/g) && Password.match(/[A-Z]/g) && Password.match(/[0-9]/g)) {
      const user = new User({ Fac_ID, Fac_Name, Department, courses, Email, Phone_no, Password })
      await user.save()
      res.json({ message: "user registerd successfully" })
    }
    else {
      res.status(401).json({
        error: "password is not strong"
      })
    }
    
  } catch (error) {
    console.log(error);
  }

})

router.post("/Login", async (req, res) => {
  try {
    const { Fac_ID, Email, Password } = req.body;
    if (!Fac_ID || !Email || !Password) {
      return res.status(400).json({
        Error: "Please fill data",
      });
    }
    const userlogin = await User.findOne({ Email: Email });
    if (userlogin) {
      const match = await bcrypt.compare(Password, userlogin.Password);
      const MatchId = await User.findOne({ Fac_ID: Fac_ID, Email: Email })
      console.log(MatchId);
      if (!match || !MatchId) {
        res.status(400).json({
          Error: "Invalid credentials",
        });
      } else {

        res.json({
          message: "User Signin Successfully",
          userlogin
        });
      }
    } else {
      res.status(403).json({
        Error: "Invalid credentials Id or Email",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/contact", async (req, res) => {
  try {
    const { Name, Email, Message } = req.body;
    if (!Name || !Email || !Message) {
      res.status(400).json({
        Error: "Invalid credentials"
      })
    }
    const MatchId = await User.findOne({ Email: Email })
    if (MatchId) {
      const send = new Contact({ Name, Email, Message })
      await send.save()
      res.status(200).json({
        Message: "matched"
      })
    }
    else {
      res.status(400).json({
        Message: "unmatched"
      })
    }
  } catch (error) {
    console.log(error);
  }
})
router.get("/Admin", function (req, res) {
  User.find(function (err, found) {
    if (!err) {
      // res.send(found)
      res.status(200).json({ found })
    }
  })
})
router.get("/query", function (req, res) {
  Contact.find(function (err, found) {
    if (!err) {
      res.status(200).json(found)
    }
  })
})

router.post("/delete", function (req, res) {
  const Fac_ID = req.body.Fac_ID
  User.deleteOne({ Fac_ID }, function (err) {
    if (!err) {
      res.json({
        message:
          "deleted succesfully"
      })
    } else {
      res.json({
        error: "somthing is wrong"
      })
    }
  })
})

module.exports = router;
