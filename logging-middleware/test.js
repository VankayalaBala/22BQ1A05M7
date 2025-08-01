// test.js
import { log } from './logger.js';
import 'dotenv/config';

await log('backend', 'info', 'middleware', 'Testing log after setup');
