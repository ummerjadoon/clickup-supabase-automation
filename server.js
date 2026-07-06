const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const logger = require('./src/utils/logger');
const leadCapture = require('./src/clickup/leadCapture');
const emailNotifications = require('./src/workflows/emailNotifications');
const scheduler = require('./src/workflows/scheduling');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/webhook/lead', async (req, res) => {
  try {
    logger.info('Lead webhook received', { body: req.body });
    const result = await leadCapture.processLead(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    logger.error('Lead processing error', { error: error.message });
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/webhook/clickup', async (req, res) => {
  try {
    logger.info('ClickUp webhook received', { event: req.body.event });
    res.json({ success: true });
  } catch (error) {
    logger.error('ClickUp webhook error', { error: error.message });
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

app.get('/stats', async (req, res) => {
  try {
    const stats = {
      uptime: process.uptime(),
      timestamp: new Date(),
      environment: process.env.NODE_ENV
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  logger.info(`Automation server running on port ${PORT}`);
  scheduler.initializeSchedules();
});

module.exports = app;