const { auth, requiresAuth } = require('express-openid-connect');
const express = require('express');
const app = express();
const path = require("path");

require('dotenv').config();
/*const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: '7WYv1mBcuViaj4SJBNlbsEXO6SzKW4SF',
  issuerBaseURL: 'https://authserver435325.us.auth0.com',
  secret: 'LONG_RANDOM_STRING'
};*/

// auth router attaches /login, /logout, and /callback routes to the baseURL
//app.use(auth(config));
app.use(express.static(path.join(__dirname + "/build")));
app.use(
  auth({
      authRequired: false,
      auth0Logout : true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
  })
);

app.get('/', (req, res, next)=>{

    //res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    const authenticated = false;//req.oidc.isAuthenticated();
    /*
  if(authenticated === true){
    //res.sendFile(__dirname  + '/build/index.html')
    res.send('Logged in')
  } else {
    res.send('Logged out')
  }*/
  res.send('welcome to home page')
  next();
    //res.sendFile(req.oidc.isAuthenticated() ? __dirname  + '/build/index.html' : 'Logged out');

});
app.get('/login', (req, res)=>{
  res.send('login');
});
app.get('/logout', (req, res)=>{
  res.send('logout');
});
app.get('/profile', requiresAuth(), (req, res)=>{
   res.send(JSON.stringify(req.oidc.user));
});
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})




