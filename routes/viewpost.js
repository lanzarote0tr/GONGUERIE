import createError from 'http-errors';
import express from 'express';
import * as helper from '../helper.js';
import dbMiddleware from '../middlewares/dbMiddleware.js';

const router = express.Router();
router.use(dbMiddleware);

router.get('/', async function(req, res, next) {
  if (req.query.postid) {
    try {
      let cmd = "UPDATE announcements SET view_count = view_count + 1 WHERE n = ?";
      await req.conn.query(cmd, [req.query.postid]);
      cmd = "SELECT * FROM announcements WHERE n = ?";
      const result = await req.conn.query(cmd, [req.query.postid]);
      result[0][0].written_date = helper.formatDate(result[0].written_date);
      res.render("viewpost", result[0][0]);
    } catch(err) {
      next(createError(500));
    }
  } else {
    res.redirect("/announcements");
  }
});

router.delete('/', async function(req, res, next) {
  if (req.query.postid) {
    try {
      const cmd = "DELETE FROM announcements WHERE n = ?";
      await req.conn.query(cmd, [req.query.postid]);
      res.status(200).send();
    } catch(err) {
      console.error('Query Error: ', err);
      next(createError(500));
    }
  } else {
    next(createError(400));  //malformed request syntax
  }
});

export default router;
 
