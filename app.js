var express = require('express');
var db = require('./models');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('cookie-session');

loginMiddleware = require('./middleware/loginHelpers');
routeMiddleware = require('./middleware/routeHelpers');
moment = require('moment');
app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(methodOverride('_method'));
app.use(session({
  maxAge: 3600000,
  secret: 'nopenopenope',
  name: 'user',
}));

app.use(loginMiddleware);

app.use(function(req, res, next) {
  db.User.findById(req.session.id, function(err, user) {
    if (err) {
      console.log('User Data Err', err);
    } else {
      res.locals.userInfo = user;
    }
    next();
  });
  res.locals.userSession = req.session.id;
});

require('./controllers/index');

app.listen(process.env.PORT || 3000, function() {
  console.log('server is listening on port ' + process.env.PORT || 3000);
});
