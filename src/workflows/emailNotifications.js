const nodemailer = require('nodemailer');
const logger = require('../utils/logger');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

class EmailNotifications {
  async sendNewLeadNotification(lead) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_USER,
        subject: `🔥 New ${lead.priority} Priority Lead: ${lead.name}`,
        html: this.getLeadEmailTemplate(lead)
      };

      const result = await transporter.sendMail(mailOptions);
      logger.info('Email sent successfully', { messageId: result.messageId });
      return result;
    } catch (error) {
      logger.error('Email sending failed', { error: error.message });
      throw error;
    }
  }

  getLeadEmailTemplate(lead) {
    return `
      <h2>New Lead Received! 🎉</h2>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Phone:</strong> ${lead.phone || 'N/A'}</p>
      <p><strong>Company:</strong> ${lead.company || 'N/A'}</p>
      <p><strong>Priority:</strong> ${lead.priority.toUpperCase()}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p>${lead.message || 'No message provided'}</p>
    `;
  }
}

module.exports = new EmailNotifications();