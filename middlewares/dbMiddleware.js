import mysql from 'mysql2/promise';
import createError from 'http-errors';

const db_info = {
  host:process.env.DB_HOST,
  post:process.env.DB_POST,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_DATABASE,
}

const dbMiddleware = async (req, res, next) => {
  try {
    req.conn = await mysql.createConnection(db_info);
    next();
  } catch(err) {
    next(createError(500));
    // res.redirect(301, '/error?errorcode=500');
  }
};

export default dbMiddleware;
