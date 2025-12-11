import createError from 'http-errors';
import announcementsService from '../services/announcements.service.js';

async function viewPost(req, res, next) {
  const postId = req.query.postid;
  if (!postId) {
    res.redirect('/announcements');
    return;
  }

  try {
    const announcement = await announcementsService.getAnnouncement(postId, {
      incrementView: true,
    });
    if (!announcement) {
      next(createError(404));
      return;
    }
    res.render('viewpost', announcement);
  } catch (err) {
    next(createError(500, err));
  }
}

function renderWritePost(req, res) {
  res.render('writepost');
}

async function createPost(req, res, next) {
  const { title, content } = req.body;
  if (!title || !content) {
    next(createError(400, 'Missing title or content'));
    return;
  }

  try {
    const { id } = await announcementsService.createAnnouncement({
      title,
      author: 'Unknown User',
      content,
    });
    res.status(201).send({ id });
  } catch (err) {
    next(createError(500, err));
  }
}

async function deletePost(req, res, next) {
  const postId = req.query.postid;
  if (!postId) {
    next(createError(400, 'Missing post id'));
    return;
  }

  try {
    await announcementsService.removeAnnouncement(postId);
    res.status(200).send();
  } catch (err) {
    next(createError(500, err));
  }
}

export { viewPost, renderWritePost, createPost, deletePost };
