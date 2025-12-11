import createError from 'http-errors';
import announcementsService from '../services/announcements.service.js';
import { formatDate } from '../utils/date.js';

async function renderHome(req, res, next) {
  try {
    const announcements = await announcementsService.listRecent();
    res.render('index', { res: announcements, helper: { formatDate } });
  } catch (err) {
    next(createError(500, err));
  }
}

async function renderAnnouncements(req, res, next) {
  try {
    const announcements = await announcementsService.listRecent();
    res.render('announcements', { res: announcements, helper: { formatDate } });
  } catch (err) {
    next(createError(500, err));
  }
}

export { renderHome, renderAnnouncements };
