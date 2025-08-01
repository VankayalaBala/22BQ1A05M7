// logger.js
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const allowedStacks = ['frontend', 'backend', 'both'];
const allowedPackages = {
  backend: ['cache', 'controller', 'cron_job', 'db', 'domain handler', 'repository', 'service', 'route'],
  frontend: ['api', 'component', 'hook', 'page', 'stage', 'style'],
  both: ['auth', 'config', 'middleware', 'utils'],
};

export const log = async (stack, level, pkg, message) => {
  try {
    if (!allowedStacks.includes(stack)) {
      throw new Error('Invalid stack');
    }

    if (
      !(allowedPackages[stack] && allowedPackages[stack].includes(pkg)) &&
      !(stack === 'both' && allowedPackages.both.includes(pkg))
    ) {
      throw new Error('Invalid package');
    }

    const payload = {
      stack,
      level,
      package: pkg,
      message,
      timestamp: new Date().toISOString(),
    };

    const response = await axios.post(process.env.LOGGER_URL, payload, {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        'x-api-key': process.env.API_KEY || '',
      },
    });

    console.log('✅ Log sent:', response.data);
  } catch (err) {
    console.error('❌ Failed to log:', { message: err.message });
  }
};
