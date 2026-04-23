/**
 * @copyright Copyright (c) 2026 Kaytx ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';

const app = express();
const server = createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Kaytx Backend API',
    version: '2.5.8',
    endpoints: {
      health: '/health',
      api: '/api'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      backend: 'running',
      database: 'mock',
      frontend: 'pending'
    }
  });
});

// Mock API endpoints
app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.get('/api/analytics', (req, res) => {
  res.json({
    analytics: {
      totalUsers: 0,
      activeSessions: 0,
      systemLoad: 'low'
    }
  });
});

// Mock authentication
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    res.json({
      success: true,
      token: 'mock_jwt_token',
      user: { id: 1, email }
    });
  } else {
    res.status(400).json({ error: 'Missing credentials' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Mock Backend Server running at http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
});

export default app;
