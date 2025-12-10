import createError from 'http-errors';
import express from 'express';
import db from '../db.js';
import * as helper from '../helper.js';

const router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    const cmd = "SELECT * FROM announcements ORDER BY n DESC LIMIT 0, 10;";
    const result = await db.query(cmd);
    res.render('index', {res: result[0], helper: helper});
  } catch(err) {
    console.error('Query Error: ', err);
    next(createError(500));
  }
});

export default router;
