-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  company VARCHAR(255),
  message TEXT,
  source VARCHAR(100),
  priority VARCHAR(50) DEFAULT 'medium',
  clickup_task_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id BIGSERIAL PRIMARY KEY,
  lead_id BIGINT REFERENCES leads(id) ON DELETE CASCADE,
  clickup_task_id VARCHAR(255) UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority INT,
  due_date TIMESTAMP,
  assigned_to VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create email logs table
CREATE TABLE IF NOT EXISTS email_logs (
  id BIGSERIAL PRIMARY KEY,
  recipient_email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  template VARCHAR(100),
  status VARCHAR(50),
  error_message TEXT,
  sent_at TIMESTAMP DEFAULT NOW()
);

-- Create activity logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id BIGSERIAL PRIMARY KEY,
  lead_id BIGINT REFERENCES leads(id) ON DELETE CASCADE,
  action VARCHAR(255),
  details JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);