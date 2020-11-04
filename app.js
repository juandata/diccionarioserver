const { auth, requiresAuth } = require('express-openid-connect');
const express = require('express');
const app = express();
require('dotenv').config();

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

app.get('/', (req, res)=>{
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res)=>{
    res.send(JSON.stringify(req.oidc.user));
});
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})
const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: '7WYv1mBcuViaj4SJBNlbsEXO6SzKW4SF',
  issuerBaseURL: 'https://authserver435325.us.auth0.com',
  secret: 'LONG_RANDOM_STRING'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
});