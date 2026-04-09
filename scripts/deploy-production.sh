#!/bin/bash

# Kaytx Platform Deployment Script
# This script handles the deployment of consolidated services

set -e

echo "🚀 Starting Kaytx Platform Deployment..."

# Environment validation
if [ -z "$NODE_ENV" ]; then
    echo "❌ NODE_ENV not set. Please set to 'production' or 'staging'"
    exit 1
fi

if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL not set"
    exit 1
fi

echo "✅ Environment validation passed"

# Build the application
echo "📦 Building application..."
npm run build

# Run database migrations
echo "🗄️ Running database migrations..."
npm run migrate

# Run comprehensive tests
echo "🧪 Running comprehensive test suite..."
npm run test:production

# Check service health
echo "🏥 Checking service health..."
npm run health-check

# Deploy consolidated services
echo "🚀 Deploying consolidated services..."

# Start services in production mode
echo "📡 Starting production services..."
pm2 start ecosystem.config.js --env production

# Verify deployment
echo "✅ Verifying deployment..."
sleep 10

if npm run health-check; then
    echo "🎉 Deployment successful!"
    echo "📊 Services are running and healthy"
else
    echo "❌ Deployment failed - rolling back..."
    pm2 stop all
    exit 1
fi

echo "📈 Deployment completed successfully!"
echo "🔍 Monitor services with: pm2 monit"
echo "📊 View logs with: pm2 logs"
