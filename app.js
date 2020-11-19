const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
//const databaseUrl = "mongodb://localhost:27017/node-demo";
const databaseUrl = 'mongodb://juandata:mimosin8@ds227119.mlab.com:27119/transportadorasapp';


//const connectToMongoDb = require('./connectToMongoDb');

//schemas
const schemas = require('./schemas')

require('dotenv').config();
app.use(cors());
const publicPath = path.join(__dirname, '/build');
app.use(express.static(publicPath));
app.use('*', express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connection to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('estamos conectados a la base de datos');
});
/*
app.get('/', (req, res)=>{

  res.send('welcome to home page')

});*/


app.get('/login', (req, res)=>{
  res.send('login');
});
app.get('/logout', (req, res)=>{
  res.send('logout');
});
app.get('/profile', (req, res)=>{
    res.send('profile')
});


//compiling models
const SignupInputModel = mongoose.model("Model", schemas.blogSchema, 'signupInputModel');

app.post("/signup", (req, res) => {
  const myData = new SignupInputModel(req.body);

  //check if email exists
  SignupInputModel.exists({ email: req.body.email }, function(err, result) {
    if (err) {
      console.log('hubo un error', err)
      res.status(400).send("Bad Request, unable to save to database.");

    } else if(!result){
      myData.save()
      .then(item => {
        console.log('no existe se procede a guardar en la base de datos')
        res.status(201).send('An account with the email' + item.email + ' was created.');//Resource Created
      })
      .catch(err2 => {
        console.log('hubo un error y no se pudo guardar en la base de datos', err2)
        res.status(400).send("Bad Request, unable to save to database.",  err2 )
      });
    }
    else if (result){
      console.log('el email si existe en la base de datos', result);
      res.status(409).send('Conflict, the email already exists, try a new one or sign in with your account.')
    }
  });

});

app.post('/signin', (req, res)=>{
  console.log('signin activated')
  //check if email exists
  SignupInputModel.exists({ email: req.body.email }, (err, result)=> {
    if (err) {
      console.log('hubo un error', err)
      res.status(400).send("Bad Request.");

    } else if(!result){
   //no existe
   console.log('no existe')
   res.status(400).send("The email does not exist in the database.");
    }
    else if (result){
      console.log('el email si existe en la base de datos', result);
      SignupInputModel.findOne({ 'email': req.body.email },  (err, doc)=> {
        if(err) {
          console.log('hubo un error', err);
          res.status(400).send('there was an error looking for the document')
        }
             //check if the password matches with the email
        if(doc.password === req.body.password){
          //el password coincide
          res.status(201).send(doc)

        } else {
          //el password no coincide
          res.status(400).send('The password is incorrect.')

        }

      });
  
    }
  });
})

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})




