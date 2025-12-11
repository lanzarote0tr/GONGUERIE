import announcementsRepo from '../repositories/announcements.repo.js';
import { formatDate } from '../utils/date.js';
import { inferCategory } from './ai.service.js';

const CATEGORY_MAP = {
  '국어': 1,
  '영어': 2,
  '수학': 3,
  '과학': 4,
};

function normalizeCategory(rawCategory) {
  const key = String(rawCategory || '').trim();
  return CATEGORY_MAP[key] || 0;
}

async function listRecent(limit = 10) {
  return announcementsRepo.getLatest(limit);
}

async function getAnnouncement(id, { incrementView = false } = {}) {
  if (incrementView) {
    await announcementsRepo.incrementViewCount(id);
  }
  const announcement = await announcementsRepo.getById(id);
  if (!announcement) {
    return null;
  }
  return { ...announcement, written_date: formatDate(announcement.written_date) };
}

async function removeAnnouncement(id) {
  await announcementsRepo.deleteById(id);
}

async function createAnnouncement({ title, author = 'Unknown User', content }) {
  const categoryText = await inferCategory(`${title}${content}`);
  const category = normalizeCategory(categoryText);
  const id = await announcementsRepo.createAnnouncement({
    title,
    author,
    category,
    content,
  });
  return { id, category };
}

export default {
  listRecent,
  getAnnouncement,
  removeAnnouncement,
  createAnnouncement,
};
