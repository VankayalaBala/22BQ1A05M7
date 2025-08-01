// server.js
import express from 'express';
import { config } from 'dotenv';
import { loggingMiddleware } from './logging-middleware/index.js';

config();

const app = express();
const PORT = process.env.PORT || 3000;

// Apply the logging middleware
app.use(loggingMiddleware);

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
