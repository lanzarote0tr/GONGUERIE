import createError from 'http-errors';
import authService from '../services/auth.service.js';

function renderSignIn(req, res) {
  res.render('signin');
}

function renderSignUp(req, res) {
  res.render('signup');
}

async function signIn(req, res, next) {
  try {
    const isValid = await authService.authenticate(req.body.id, req.body.pw);
    if (!isValid) {
      res.status(401).send();
      return;
    }
    req.session.user = {
      id: req.body.id,
      authorized: true,
    };
    res.status(200).send();
  } catch (err) {
    next(createError(400, err));
  }
}

async function signUp(req, res, next) {
  try {
    await authService.register(req.body.id, req.body.pw);
    req.session.user = {
      id: req.body.id,
      authorized: true,
    };
    res.status(200).send();
  } catch (err) {
    next(createError(500, err));
  }
}

export { renderSignIn, renderSignUp, signIn, signUp };
