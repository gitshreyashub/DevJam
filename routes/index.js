

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
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
        return res.sendFile(path.join(__dirname, '..', 'userlogin', 'landing.html')); 
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

    router.get('/forgot_password', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'userlogin', 'forgotpass.html'));
  });



  router.post('/forgot_password', async (req, res) => {
    const { email, phoneNumber } = req.body; 
    
    try {
        let user = await User.findOne({ email, phoneNumber });
        
        if (!user) {
            req.flash('error_msg', 'Invalid Credentials');
            res.redirect('/forgot_password');
        } else {
            req.flash('success_msg', 'Verification Code Sent');
            res.redirect('/forgot_password');
        }
        
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'An error occurred');
        res.redirect('/forgot_password');
    }
});

//other routes
router.get('/buy', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'userlogin', 'buy.html'));
});

router.get('/mountain', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'userlogin', 'mountain.html'));
});
router.get('/beach', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'userlogin', 'beach.html'));
});
router.get('/foreign', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'userlogin', 'foreign.html'));
});

router.get('/kasol', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'userlogin', 'kasol.html'));
});

router.get('/nepal', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'userlogin', 'nepal.html'));
});

router.get('/bhutan', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'userlogin', 'bhutan.html'));
});


router.get('/munnar', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'userlogin', 'munnar.html'));
});


router.get('/leh', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'userlogin', 'leh.html'));
});


router.get('/darjeeling', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'userlogin', 'darjeeling.html'));
});


router.get('/foreign', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'userlogin', 'foreign.html'));
});

router.get('/weather', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'userlogin', 'weather.html'));
});

router.get('/calender', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'userlogin', 'calender.html'));
});

router.get('/count', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'userlogin', 'count.html'));
});

router.get('/todo', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'userlogin', 'todo.html'));
});


module.exports = router;
