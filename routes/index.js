const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
// const app = require('../server.js')

// app.use(express.urlencoded({ extended: true }));

// const bodyParser = require('body-parser')
// const jsonParser = bodyParser.json()


const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'userlogin', 'homePage.html'));
});

// Register Page
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'userlogin', 'signup.html'));
});

// Register Handle
router.post('/signup', async (req, res) => {
  const {  email, password, phoneNumber } = req.body;
  console.log(req)

  try {
    let user = await User.findOne({ email });
    if (user) {
      req.flash('error_msg', 'Email is already registered');
      res.redirect('/signup');
    } else {
      const newUser = new User({  email, password, phoneNumber });

      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      await newUser.save();
      req.flash('success_msg', 'Registration successful. You can now log in.');
      res.redirect('/login');
    }
  } catch (err) {
    console.log("Error in post request handler")
    console.error(err);
    res.redirect('/signup');
  }
});

// Login Page
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'userlogin', 'login.html'));
});

// Login Handle
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        req.flash('success_msg', 'Login successful');
        res.redirect('/dashboard');
      } else {
        req.flash('error_msg', 'Incorrect password');
        res.redirect('/login');
      }
    });
  } else {
    req.flash('error_msg', 'Email not registered');
    res.redirect('/login');
  }
});

module.exports = router;