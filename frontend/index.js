// logging-middleware/index.js
import { log } from './logger.js';

export const loggingMiddleware = (req, res, next) => {
  const { method, url } = req;
  const message = `Incoming request: ${method} ${url}`;

  log("backend", "info", "middleware", message);

  next();
};
