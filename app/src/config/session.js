import session from 'express-session';
import env from './env.js';

const sessionMiddleware = session({
  secret: env.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 },
});

export default sessionMiddleware;
