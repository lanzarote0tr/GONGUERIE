import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import routes from './routes/index.js';
import sessionMiddleware from './config/session.js';
import errorHandler from './middleware/error-handler.js';
import env from './config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('port', env.port);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

export default app;
