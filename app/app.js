import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import announcementsRouter from './routes/announcements.js';
import viewPostRouter from './routes/viewpost.js';
import writePostRouter from './routes/writepost.js';
import signInRouter from './routes/signin.js';
import signUpRouter from './routes/signup.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = Number(process.env.PORT || 3000);

const app = express();
app.set('port', port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
  secret: process.env.SESSION_SECRET || "defaultSecret",
  resave: true,
  saveUninitialized: false,
  // https://dev.to/m__mdy__m/understanding-cookies-and-sessions-in-nodejs-3449
  // saveUninitialized should be false until the user allows to
  cookie: { maxAge: 60000 }
}));

app.use('/', indexRouter);
app.use('/announcements', announcementsRouter);
app.use('/viewpost', viewPostRouter);
app.use('/writepost', writePostRouter);
app.use('/signin', signInRouter);
app.use('/signup', signUpRouter);
app.use('/error', function(req, res) {
  let s = Number(req.query.errorcode) || 418;
  let clientErrorMessage = {
    404: "We couldn't find the page you were looking for.",
    418: "We have an unexpected error. (I became a teapot)",
    500: "We have an internal server error."
    
  };
  
  // Access the custom error message dynamically using brackets
  let errorMessage = clientErrorMessage[s] || "An unexpected error occurred.";
  res.status(s).render('error', { status: s, error: errorMessage });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  let s = err.status || 500;
  
  if(process.env.NODE_ENV === 'development') {
    res.status(s).render('error', { status: s, error: err });
  } else {
    // redirect to the error page to render client error message
    res.redirect('/error?errorcode=' + s);
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
}).on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});
