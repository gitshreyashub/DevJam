const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // User model
const path = require('path');

// Login Page
router.get('/login', (req, res) => res.sendFile(path.join(__dirname, '..', 'userlogin', 'login.html')));

// Register Page
router.get('/register', (req, res) => res.sendFile(path.join(__dirname, '..', 'userlogin', 'signup.html')));

// Register Handle
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  let errors = [];

  if (!name || !email || !password) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (errors.length > 0) {
    res.send({ errors, name, email, password });
  } else {
    try {
      let user = await User.findOne({ email: email });
      if (user) {
        errors.push({ msg: 'Email is already registered' });
        res.send({ errors, name, email, password });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();
        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/login');
      }
    } catch (err) {
      console.error(err);
      res.redirect('/register');
    }
  }
});

// Login Handle
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        req.flash('success_msg', 'You are now logged in');
        res.redirect('/dashboard'); // Assuming you have a dashboard route
      } else {
        req.flash('error_msg', 'Password incorrect');
        res.redirect('/login');
      }
    });
  } else {
    req.flash('error_msg', 'Email not registered');
    res.redirect('/login');
  }
});

module.exports = router;