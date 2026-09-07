# Start Kaytx Backend Server (Development Mode)
# No external services or .env file required

$env:NODE_OPTIONS = "--no-warnings"

Write-Host "Starting Kaytx backend server on http://localhost:3001" -ForegroundColor Green

node --import "./node_modules/tsx/dist/loader.mjs" backend/server.ts
