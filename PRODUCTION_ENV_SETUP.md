# Production Environment Variables Setup Guide

## Overview
This guide helps set up the required environment variables on your production VPS for the bernardino-martin-hvac application.

## Required Environment Variables

### 1. DATABASE_URL (Required)
**Purpose**: PostgreSQL connection string for the database
**Format**: `postgresql://username:password@host:port/database`

**Example**:
```
postgresql://hvac_user:MySecurePassword123@localhost:5432/bernardino_martin
```

**How to find/create**:
```bash
# SSH to your VPS
ssh michael@160.153.176.159

# Check if PostgreSQL is running
sudo systemctl status postgresql

# Connect to PostgreSQL
sudo -u postgres psql

# List databases
\l

# If bernardino_martin database doesn't exist, create it:
CREATE DATABASE bernardino_martin;

# Create a dedicated user (if needed):
CREATE USER hvac_user WITH PASSWORD 'MySecurePassword123';

# Grant privileges:
GRANT ALL PRIVILEGES ON DATABASE bernardino_martin TO hvac_user;

# Exit psql
\q
```

### 2. SESSION_SECRET (Required)
**Purpose**: Secret key for signing session cookies
**Length**: Minimum 32 characters
**Security**: Generate a random, cryptographically secure string

**How to generate**:
```bash
# Option 1: Using Node.js (if installed)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 2: Using OpenSSL
openssl rand -hex 32

# Option 3: Using Python
python3 -c "import secrets; print(secrets.token_hex(32))"

# Example output:
# a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1
```

### 3. ADMIN_PASSWORD (Required)
**Purpose**: Password for admin login to the dashboard
**Security**: Use a strong, unique password

**Example**:
```
MyAdminPassword!@#$%^&*()_+
```

**How to generate a strong password**:
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"

# Using OpenSSL
openssl rand -base64 24

# Online: https://passwordsgenerator.net/ (for reference only)
```

### 4. NODE_ENV (Required)
**Purpose**: Set application to production mode
**Value**: `production` (for production VPS)

### 5. PORT (Required)
**Purpose**: Port for the Node.js server
**Value**: `3000` (default, should be behind reverse proxy like Nginx)

### 6. EMAIL_USER / EMAIL_PASS (Optional — needed for email features)
**Purpose**: Gmail credentials used to send admin "reply to contact" emails and owner
notification emails (new booking/quote/contact alerts). The app runs fine without these — email
sending is skipped and logged as an error, nothing else is affected.
**EMAIL_USER**: the Gmail address to send from (e.g. `you@gmail.com`)
**EMAIL_PASS**: a Gmail **App Password** (not your regular Gmail password) — generate one at
https://myaccount.google.com/apppasswords (requires 2-Step Verification enabled on the account)

### 7. OWNER_NOTIFICATION_EMAIL (Optional)
**Purpose**: Where new booking/quote/contact alert emails are sent. Defaults to `EMAIL_USER` if
unset, so this only needs to be set if you want alerts to go to a different inbox than the one
email is sent *from*.

## VPS Setup Instructions

### Step 1: SSH to Production Server
```bash
ssh michael@160.153.176.159
```

### Step 2: Create/Edit .env File
```bash
# Navigate to home directory
cd ~

# Create or edit the .env file
nano .env
```

### Step 3: Add Environment Variables
Copy and paste the following template, filling in your actual values:

```bash
# Database Connection
DATABASE_URL=postgresql://hvac_user:MySecurePassword123@localhost:5432/bernardino_martin

# Session Secret (generate using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
SESSION_SECRET=a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1

# Admin Dashboard Password
ADMIN_PASSWORD=MyAdminPassword!@#$%^&*()_+

# Environment Mode
NODE_ENV=production

# Application Port
PORT=3000

# Email (optional — enables admin reply emails + new lead notifications)
EMAIL_USER=you@gmail.com
EMAIL_PASS=your16charapppassword
OWNER_NOTIFICATION_EMAIL=you@gmail.com
```

### Step 4: Save and Exit
- Press `Ctrl + O` to save
- Press `Enter` to confirm
- Press `Ctrl + X` to exit

### Step 5: Source the Environment Variables
```bash
# Make them available in current session
source ~/.env

# Verify they were loaded
echo $DATABASE_URL
echo $SESSION_SECRET
echo $ADMIN_PASSWORD
```

### Step 6: Update PM2 Ecosystem Configuration (if using ecosystem.config.js)
```bash
# Edit your PM2 ecosystem config
nano ~/bernardino-martin-hvac/ecosystem.config.js
```

Make sure it includes environment variables:
```javascript
module.exports = {
  apps: [{
    name: 'bernardino-hvac',
    script: 'dist/index.cjs',
    env: {
      NODE_ENV: 'production',
      DATABASE_URL: process.env.DATABASE_URL,
      SESSION_SECRET: process.env.SESSION_SECRET,
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
      PORT: process.env.PORT || 3000,
    }
  }]
};
```

### Step 7: Restart PM2 with Updated Environment
```bash
# Source environment variables
source ~/.env

# Restart all processes with updated environment
pm2 restart all --update-env

# Verify they're running
pm2 status

# Check logs for any errors
pm2 logs --lines 50
```

## Verification Checklist

### ✓ Check Database Connection
```bash
# SSH to server
ssh michael@160.153.176.159

# Test PostgreSQL connection
psql $DATABASE_URL -c "SELECT 1"

# Should output:
# ?column?
#    1
# (1 row)
```

### ✓ Check Environment Variables Loaded
```bash
# SSH to server
ssh michael@160.153.176.159

# Check if variables are set
env | grep -E "DATABASE_URL|SESSION_SECRET|ADMIN_PASSWORD|NODE_ENV|PORT"

# Should show all 5 variables
```

### ✓ Check PM2 Environment
```bash
# SSH to server
ssh michael@160.153.176.159

# Show process details including environment
pm2 show 0  # Replace 0 with your app's process ID

# Look for environment variables in the output
```

### ✓ Test Application Server
```bash
# From local machine
curl https://bernardinomartinhvac.com/health

# Expected response:
# {"status":"ok","time":"2026-05-06T..."}
```

### ✓ Test Admin Login
```bash
# From local machine
curl -X POST https://bernardinomartinhvac.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password":"MyAdminPassword!@#$%^&*()_+"}' \
  -c cookies.txt

# Expected response:
# {"success":true}

# Check cookies were set
cat cookies.txt | grep "connect.sid"
```

### ✓ Test Protected Route
```bash
# Using cookie from login
curl https://bernardinomartinhvac.com/api/admin/me \
  -b cookies.txt

# Expected response:
# {"isAdmin":true}
```

## Security Best Practices

### ✓ Secure Your .env File
```bash
# Restrict permissions to owner only
chmod 600 ~/.env

# Verify permissions
ls -la ~/.env
# Should show: -rw------- (600)
```

### ✓ Never Share Environment Variables
- ❌ Don't commit .env to git
- ❌ Don't share via email or chat
- ❌ Don't expose in logs
- ✅ Keep in secure password manager
- ✅ Rotate secrets regularly

### ✓ Regular Secret Rotation
```bash
# Every 3-6 months, generate new SESSION_SECRET:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Update .env file
nano ~/.env

# Restart PM2
pm2 restart all --update-env
```

### ✓ Database Security
```bash
# Change PostgreSQL password periodically
sudo -u postgres psql
ALTER USER hvac_user WITH PASSWORD 'NewSecurePassword123';

# Update DATABASE_URL in .env
nano ~/.env

# Restart PM2
pm2 restart all --update-env
```

## Troubleshooting

### Issue: "FATAL ERROR: Missing required environment variables"
**Solution**:
```bash
# 1. Source the .env file
source ~/.env

# 2. Verify variables are set
env | grep DATABASE_URL

# 3. Restart PM2
pm2 restart all --update-env

# 4. Check logs
pm2 logs --lines 100
```

### Issue: "Cannot connect to database"
**Solution**:
```bash
# 1. Check PostgreSQL is running
sudo systemctl status postgresql

# 2. Test connection manually
psql $DATABASE_URL -c "SELECT 1"

# 3. Verify DATABASE_URL format is correct
echo $DATABASE_URL

# Should be: postgresql://user:pass@host:port/database
```

### Issue: "SESSION_SECRET must be set in production"
**Solution**:
```bash
# 1. Generate SESSION_SECRET
SESSION_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

# 2. Add to .env
echo "SESSION_SECRET=$SESSION_SECRET" >> ~/.env

# 3. Source it
source ~/.env

# 4. Restart PM2
pm2 restart all --update-env
```

### Issue: Admin login not working
**Solution**:
```bash
# 1. Check ADMIN_PASSWORD is set
echo $ADMIN_PASSWORD

# 2. Make sure password is correct in request:
curl -X POST https://bernardinomartinhvac.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password":"'$ADMIN_PASSWORD'"}'

# 3. Check server logs
pm2 logs | grep -i "login"
```

## Production Monitoring

### Daily Checks
```bash
# SSH to server
ssh michael@160.153.176.159

# Check application is running
pm2 status

# Check for any errors
pm2 logs --lines 20 | grep -i "error"

# Check database connection
psql $DATABASE_URL -c "SELECT COUNT(*) FROM session;"
```

### Weekly Tasks
```bash
# Check disk space
df -h

# Check database size
psql $DATABASE_URL -c "\l+ bernardino_martin"

# Review PM2 logs for errors
pm2 logs --lines 100 2>&1 | grep -E "error|Error|ERROR"
```

## Support

If you encounter issues:

1. Check the server logs: `pm2 logs --lines 100`
2. Verify .env file: `cat ~/.env`
3. Test database connection: `psql $DATABASE_URL -c "SELECT 1"`
4. Check PM2 status: `pm2 status`
5. Review this guide: Sections on "Troubleshooting"

## Quick Reference

```bash
# SSH to server
ssh michael@160.153.176.159

# Generate random secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# View/edit environment variables
nano ~/.env

# Source environment
source ~/.env

# Verify loaded
env | grep NODE_ENV

# Restart app
pm2 restart all --update-env

# Check status
pm2 status

# View logs
pm2 logs

# Test connection
curl https://bernardinomartinhvac.com/health
```
