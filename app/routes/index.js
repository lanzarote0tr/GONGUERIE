import createError from 'http-errors';
import express from 'express';
import * as helper from '../helper.js';
import dbMiddleware from '../middlewares/dbMiddleware.js';

const router = express.Router();
router.use(dbMiddleware);

router.get('/', async function(req, res, next) {
  try {
    const cmd = "SELECT * FROM announcements ORDER BY n DESC LIMIT 0, 10;";
    const result = await req.conn.query(cmd);
    res.render('index', {res: result[0], helper: helper});
  } catch(err) {
    console.error('Query Error: ', err);
    next(createError(500));
  }
});

export default router;
