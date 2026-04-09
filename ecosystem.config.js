module.exports = {
  apps: [
    {
      name: 'kaytx-platform',
      script: './dist/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        DATABASE_URL: process.env.DATABASE_URL,
        REDIS_URL: process.env.REDIS_URL,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
        TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN
      },
      // Memory and CPU limits
      max_memory_restart: '1G',
      max_cpu_restart: 90,
      
      // Health check configuration
      health_check_grace_period: 3000,
      health_check_fatal_exceptions: true,
      
      // Logging configuration
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Monitoring and alerting
      monitoring: false,
      pmx: true,
      
      // Graceful shutdown
      kill_timeout: 5000,
      listen_timeout: 3000,
      
      // Restart strategy
      restart_delay: 4000,
      autorestart: true,
      watch: false,
      
      // Environment-specific settings
      node_args: '--max-old-space-size=1024',
      
      // Consolidated services configuration
      env_staging: {
        NODE_ENV: 'staging',
        PORT: 3001,
        DATABASE_URL: process.env.STAGING_DATABASE_URL,
        REDIS_URL: process.env.STAGING_REDIS_URL
      }
    }
  ],
  
  deploy: {
    production: {
      user: 'deploy',
      host: ['your-production-server.com'],
      ref: 'origin/main',
      repo: 'git@github.com:your-org/kaytx-platform.git',
      path: '/var/www/kaytx-platform',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && npm run migrate && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'StrictHostKeyChecking=no'
    },
    staging: {
      user: 'deploy',
      host: ['your-staging-server.com'],
      ref: 'origin/develop',
      repo: 'git@github.com:your-org/kaytx-platform.git',
      path: '/var/www/kaytx-platform-staging',
      'post-deploy': 'npm install && npm run build && npm run migrate && pm2 reload ecosystem.config.js --env staging'
    }
  }
};
