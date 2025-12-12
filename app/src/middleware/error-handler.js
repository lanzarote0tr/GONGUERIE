import env from '../config/env.js';

const clientErrorMessage = {
  404: "We couldn't find the page you were looking for.",
  418: 'We have an unexpected error. (I became a teapot)',
  400: 'The request was invalid. Please check and try again.',
  401: 'You need to sign in to continue.',
  403: "You don't have permission to do that.",
  500: 'We have an internal server error.',
  502: 'Bad gateway. Please try again later.',
  503: 'Service temporarily unavailable.',
};

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  if (env.nodeEnv === 'development') {
    res.status(status).render('error', { status, error: err });
    return;
  }
  const errorMessage = clientErrorMessage[status] || 'An unexpected error occurred.';
  res.status(status).render('error', { status, error: errorMessage });
}

export default errorHandler;
