const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
// const bodyParser = require('body-parser')

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(flash());


app.use(express.static(__dirname + '/public'));

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Route handler for fetching flash messages
app.get('/flash-messages', (req, res) => {
  const flashMessages = {
    error: req.flash('error_msg')[0],
    success: req.flash('success_msg')[0]
  };
  res.json(flashMessages);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

