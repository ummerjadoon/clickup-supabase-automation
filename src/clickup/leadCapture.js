const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
const logger = require('../utils/logger');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const CLICKUP_API = 'https://api.clickup.com/api/v2';
const headers = {
  'Authorization': process.env.CLICKUP_API_KEY,
  'Content-Type': 'application/json'
};

class LeadCapture {
  async processLead(leadData) {
    try {
      logger.info('Processing lead', { lead: leadData });
      
      if (!leadData.email || !leadData.name) {
        throw new Error('Missing required fields: email, name');
      }

      const { data: dbLead, error: dbError } = await supabase
        .from('leads')
        .insert([{
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone || null,
          company: leadData.company || null,
          message: leadData.message || null,
          source: leadData.source || 'webhook',
          priority: this.calculatePriority(leadData),
          created_at: new Date()
        }])
        .select();

      if (dbError) throw dbError;

      const clickupTask = await this.createClickUpTask(dbLead[0]);
      logger.info('ClickUp task created', { taskId: clickupTask.id });

      return {
        leadId: dbLead[0].id,
        clickupTaskId: clickupTask.id,
        status: 'processed'
      };
    } catch (error) {
      logger.error('Lead processing failed', { error: error.message });
      throw error;
    }
  }

  async createClickUpTask(lead) {
    try {
      const taskData = {
        name: `New Lead: ${lead.name}`,
        description: `Email: ${lead.email}\nPhone: ${lead.phone}\nCompany: ${lead.company}\n\nMessage: ${lead.message}`,
        priority: this.getPriority(lead.priority),
        due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).getTime()
      };

      const response = await axios.post(
        `${CLICKUP_API}/team/${process.env.CLICKUP_TEAM_ID}/list/${process.env.CLICKUP_LIST_ID}/task`,
        taskData,
        { headers }
      );

      return response.data.task;
    } catch (error) {
      logger.error('ClickUp task creation failed', { error: error.message });
      throw error;
    }
  }

  calculatePriority(leadData) {
    if (leadData.company) return 'high';
    if (leadData.phone) return 'medium';
    return 'low';
  }

  getPriority(priority) {
    const map = { high: 1, medium: 2, low: 3 };
    return map[priority] || 3;
  }
}

module.exports = new LeadCapture();