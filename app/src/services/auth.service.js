import bcrypt from 'bcrypt';
import usersRepo from '../repositories/users.repo.js';

async function authenticate(id, password) {
  const storedHash = await usersRepo.getPasswordHash(id);
  if (!storedHash) {
    return false;
  }
  return bcrypt.compare(password, storedHash);
}

async function register(id, password) {
  const hash = await bcrypt.hash(password, 10);
  await usersRepo.createUser(id, hash);
  return { id };
}

export default {
  authenticate,
  register,
};
