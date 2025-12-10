import createError from 'http-errors';
import express from 'express';
import * as helper from '../helper.js';
import dbMiddleware from '../middlewares/dbMiddleware.js';

const router = express.Router();
router.use(dbMiddleware);

router.get('/', function(req, res, next) {
  res.render("writepost");
});

router.post('/', async function(req, res, next) {
  const categorytext = await helper.callChatGPT(req.body.title+req.body.content);
  console.log(categorytext);

  let category = 0;
  if (categorytext == "국어") category = 1;
  else if (categorytext == "영어") category = 2;
  else if (categorytext == "수학") category = 3;
  else if (categorytext == "과학") category = 4;

  try {
    const cmd = 'INSERT INTO announcements (title, author, written_date, view_count, category, contents) VALUES (?, ?, now(), 0, ?, ?)';
    const result = await req.conn.query(cmd, [req.body.title, 'Unknown User', category, req.body.content]);
    res.status(201).send({id: result[0].insertId});
  } catch(err) {
    console.error('Query Error: ', err);
    createError(500);
  }
});

export default router;
 
