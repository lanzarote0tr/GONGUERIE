import db from '../config/db.js';

async function getPasswordHash(id) {
  const [rows] = await db.query('SELECT pw FROM user WHERE id = ?', [id]);
  return rows[0]?.pw || null;
}

async function createUser(id, passwordHash) {
  await db.query('INSERT INTO user (id, pw) VALUES (?, ?)', [id, passwordHash]);
}

export default {
  getPasswordHash,
  createUser,
};
