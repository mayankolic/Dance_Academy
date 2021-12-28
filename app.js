const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const port = 3001;
const bodyparser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Contactdance', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});
// we 're connected!

// define mongoose Schema

const contactschema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  age: String

});

const contact = mongoose.model('sscontact', contactschema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded({
  extended: true
}));

//PUG SPECIFIC STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//ENDPOINTS
app.get("/", (req, res) => {

  res.status(200).render('home.pug');
});
app.get("/contact", (req, res) => {

  res.status(200).render('contact.pug');
});
app.get('/home', (req, res) => {
  res.status(200).render('home.pug')
});
//New material 

app.get('/post', (req, res) => {
    res.status(200).render('post.pug');
  })
  //new mat
app.post("/contact", (req, res) => {
  var mydata = new contact(req.body);
  mydata.save().then(() => {
    res.send("This Item Is successfully saved ~~")
  }).catch(() => {
    res.status(404).send("Not saved")
  });
  // res.status(200).render('contact.pug');
});
// START THE SERVER
app.listen(port, () => {
  console.log(`The application is running at port ${port}`);
});