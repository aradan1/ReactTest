const express = require("express");
const session = require("express-session");
var FileStore = require('session-file-store')(session);

var apiRouter = require('./routes/api');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Models
var models = require("./models")
//Sync Database
models.sequelize.sync().then(function() {
  console.log("Database sync succesfully");
}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update");
});

app.use(session({
  store: new FileStore(),
  key: 'user_sid',
  secret: '%_i_love_enginyeria_software',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 1000*60*60*24*7,
  }
}));

app.use('/api', apiRouter);

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  res.locals.is_logged = false;
  if (req.cookies.user_sid){
      if (!req.session.user){
          console.log("Clear cookie");
          res.clearCookie('user_sid');
      }else{
          res.locals.is_logged = true;
          res.locals.logged_username = req.session.user;
      }
  }
  console.log(res.locals.is_logged);
  next();
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
