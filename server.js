const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      config = require('./config.js'),
      cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(session({
  resave: true, //Without this you get a constant warning about default values
  saveUninitialized: true, //Without this you get a constant warning about default values
  secret: 'keyboardcat'
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));



/////////////
// DATABASE //
/////////////
const massiveInstance = massive.connectSync({connectionString: 'postgres://localhost/CPclone'})

app.set('db', massiveInstance);
const db = app.get('db');

// db.create_user(function(err, user) {
//   if (err) console.log(err);
//   else console.log('CREATED USER');
//   console.log(user);
// })


passport.use(new Auth0Strategy({
   domain:       config.auth0.domain,
   clientID:     config.auth0.clientID,
   clientSecret: config.auth0.clientSecret,
   callbackURL:  'http://localhost:3000/auth/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    //Find user in database
    db.getUserByAuthId([profile.id], function(err, user) {
      user = user[0];
      if (!user) { //if there isn't one, we'll create one!
        console.log('CREATING USER');
        if (profile.name.familyName && profile.name.givenName) {
          var data =
          [
            profile.displayName,
            profile.id,
            profile.nickname,
            profile.name.givenName,
            profile.picture
          ]
        }
        else {
          var data =
          [
            profile.displayName,
            profile.id,
            profile._json.user_metadata.nickname,
            profile._json.user_metadata.name,
            'http://clipground.com/images/penguin-face-clipart-12.jpg'
          ]
        }
        db.createUserByAuth(data, function(err, user) {
          console.log('USER CREATED', user);
          return done(err, user[0]); // GOES TO SERIALIZE USER
        })
      } else { //when we find the user, return it
        console.log('FOUND USER', user);
        return done(err, user);
      }
    })
  }
));

//THIS IS INVOKED ONE TIME TO SET THINGS UP
passport.serializeUser(function(userA, done) {
  // var userB = userA;
  //Things you might do here :
   //Serialize just the id, get other information to add to session,
  done(null, userA); //PUTS 'USER' ON THE SESSION
});

//USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
passport.deserializeUser(function(userB, done) {
  // var userC = userC;
  //Things you might do here :
    // Query the database with the user id, get other information to put on req.user
  done(null, userB); //PUTS 'USER' ON REQ.USER
});



app.get('/auth', passport.authenticate('auth0'));


//**************************//
//To force specific provider://
//**************************//
// app.get('/login/google',
//   passport.authenticate('auth0', {connection: 'google-oauth2'}), function (req, res) {
//   res.redirect("/");
// });

app.get('/auth/callback',
  passport.authenticate('auth0', {successRedirect: '/'}), function(req, res) {
    res.status(200).send(req.user);
})

app.get('/auth/me', function(req, res) {
  if (!req.user) return res.sendStatus(404);
  //THIS IS WHATEVER VALUE WE GOT FROM userC variable above.
  res.status(200).send(req.user);
})

app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

app.post('/postPen',function(req, res){
  console.log('req for post pen',req.body);
  let data = [
    req.body.penname,
    req.body.users_id,
    req.body.htmlval,
    req.body.cssval,
    req.body.jsval,
    req.body.nickname
  ];
  db.postPen(data, (err, sqlResponse) => {
    if (!err) {
      res.status(200).send(sqlResponse);
              }
    else {
          res.send(err);
         }
  })
})

app.post('/postPost',function(req, res){
  console.log('working');
  console.log('req',req.body);
  let data = [
    req.body.title,
    req.body.users_id,
    req.body.url,
    req.body.editor,
    req.body.css
  ];
  db.postpost(data, (err, sqlResponse) => {
    if (!err) {
      res.status(200).send(sqlResponse);
              }
    else {
          res.send(err);
         }
  })
})

  app.post('/getPens',function(req, res){
    db.getPens(req.body.id, function(err,pens){
      if (!err) {
        res.status(200).send(pens);
      } else {
        res.send(err);
      }
    })
  })

  app.post('/getPosts',function(req, res){
    db.getPosts(req.body.id, function(err,pens){
      if (!err) {
        res.status(200).send(pens);
      } else {
        res.send(err);
      }
    })
  })

app.listen(3000, function() {
  console.log('Connected on 3000')
})
