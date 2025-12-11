import db from '../config/db.js';

async function getLatest(limit = 10) {
  const safeLimit = Number(limit) || 10;
  const [rows] = await db.query(
    'SELECT * FROM announcements ORDER BY n DESC LIMIT 0, ?;',
    [safeLimit]
  );
  return rows;
}

async function getById(id) {
  const [rows] = await db.query('SELECT * FROM announcements WHERE n = ?', [
    id,
  ]);
  return rows[0] || null;
}

async function incrementViewCount(id) {
  await db.query('UPDATE announcements SET view_count = view_count + 1 WHERE n = ?', [id]);
}

async function deleteById(id) {
  await db.query('DELETE FROM announcements WHERE n = ?', [id]);
}

async function createAnnouncement({ title, author, category, content }) {
  const [result] = await db.query(
    'INSERT INTO announcements (title, author, written_date, view_count, category, contents) VALUES (?, ?, now(), 0, ?, ?)',
    [title, author, category, content]
  );
  return result.insertId;
}

export default {
  getLatest,
  getById,
  incrementViewCount,
  deleteById,
  createAnnouncement,
};
