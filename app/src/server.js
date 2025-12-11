import app from './app.js';
import env from './config/env.js';

const server = app
  .listen(env.port, () => {
    console.log(`Server listening on http://localhost:${env.port}`);
  })
  .on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
  });

export default server;
