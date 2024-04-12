

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const path = require('path');

// Register Page
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'userlogin', 'signup.html'));
});

// Register Handle
router.post('/signup', async (req, res) => {
  const { email, password, phoneNumber } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      req.flash('error_msg', 'Email is already registered');
      res.redirect('/signup');
    } else {
      const newUser = new User({ email, password, phoneNumber });

      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      await newUser.save();
      req.flash('success_msg', 'Registration successful.You can now log in.');
      res.redirect('/login');
    }
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error in registration. Please try again.');
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
  try {
    let user = await User.findOne({ email });
    if (!user) {
      req.flash('error_msg', 'Email not registered');
      return res.redirect('/login');
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        req.flash('success_msg', 'Login successful');
        return res.redirect('homepage.html'); 
      } else {
        req.flash('error_msg', 'Incorrect password');
        return res.redirect('/login');
      }
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error in login. Please try again.');
    res.redirect('/login');
  }
});

module.exports = router;
