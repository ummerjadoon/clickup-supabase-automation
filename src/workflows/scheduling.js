const cron = require('node-cron');
const logger = require('../utils/logger');
const emailNotifications = require('./emailNotifications');

class Scheduler {
  initializeSchedules() {
    cron.schedule('0 9 * * 1', async () => {
      try {
        logger.info('Running weekly digest task');
      } catch (error) {
        logger.error('Weekly digest task failed', { error: error.message });
      }
    });

    logger.info('Scheduler initialized with all cron jobs');
  }
}

module.exports = new Scheduler();