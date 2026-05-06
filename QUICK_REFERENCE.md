# Quick Reference - Deployment Checklist

## ⚡ 60-Second Deployment Quick Start

```bash
# 1. Build (2 min)
npm run build

# 2. Test locally (2 min)
npm run dev &
sleep 3
curl http://localhost:3000/health

# 3. Commit (1 min)
git add -A && git commit -m "fix: Backend critical issues" && git push

# 4. Deploy (3 min)
ssh michael@160.153.176.159 "cd ~/bernardino-martin-hvac && git pull && npm run build"
ssh michael@160.153.176.159 "pm2 restart all --update-env"

# 5. Verify (1 min)
sleep 3
curl https://bernardinomartinhvac.com/health

echo "✅ DEPLOYMENT COMPLETE"
```

---

## 📋 PRE-DEPLOYMENT CHECKLIST

- [ ] Environment variables set locally (.env file exists)
- [ ] npm install completed
- [ ] No TypeScript errors: `npm run build`
- [ ] Git repo is clean: `git status`
- [ ] All changes committed
- [ ] Pushed to main branch

**Commands:**
```bash
# Check environment
cat .env | head -5

# Check build
npm run build 2>&1 | tail -20

# Check git
git status
git log --oneline | head -3

# Check push
git log origin/main --oneline | head -3
```

---

## 🧪 LOCAL TESTING CHECKLIST

- [ ] Health check works
- [ ] Admin login succeeds
- [ ] Session cookie is set
- [ ] Protected route accessible with session
- [ ] Protected route returns 401 without session
- [ ] Analytics returns numbers (not strings)

**Commands:**
```bash
# Start dev server
npm run dev &
sleep 2

# Health check
curl http://localhost:3000/health

# Login test
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password":"test"}' \
  -c /tmp/test_cookies.txt

# Session test
curl http://localhost:3000/api/admin/me -b /tmp/test_cookies.txt

# Analytics test
curl http://localhost:3000/api/admin/analytics/events \
  -b /tmp/test_cookies.txt -s | jq '.[] | .count | type'

# Stop dev server
pkill -f "npm run dev"
```

---

## 🚀 PRODUCTION DEPLOYMENT CHECKLIST

### Before Deployment
- [ ] Latest code pulled and built locally
- [ ] All local tests passed
- [ ] Changes committed and pushed
- [ ] .env file on VPS has all variables
- [ ] VPS database is accessible

### During Deployment
- [ ] SSH to VPS successful
- [ ] Git pull completed
- [ ] npm run build successful
- [ ] PM2 restart successful

### After Deployment
- [ ] Health check passes
- [ ] Admin login works
- [ ] No errors in PM2 logs
- [ ] Session table has data
- [ ] Analytics returns numbers

**Commands:**
```bash
# SSH to VPS
ssh michael@160.153.176.159

# Navigate to project
cd ~/bernardino-martin-hvac

# Pull and build
git pull && npm run build

# Restart and verify
pm2 restart all --update-env
sleep 2
pm2 status

# Check logs
pm2 logs --lines 30

# Exit SSH
exit

# Test from local machine
curl https://bernardinomartinhvac.com/health
```

---

## 🔍 VERIFICATION COMMANDS

### Health & Status
```bash
# Local dev server
curl http://localhost:3000/health

# Production
curl https://bernardinomartinhvac.com/health

# PM2 status
pm2 status

# PM2 logs
pm2 logs --lines 20

# Process info
pm2 show 0
```

### Admin Authentication
```bash
# Login
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password":"your-password"}' \
  -c /tmp/cookies.txt)

echo $LOGIN_RESPONSE

# Verify session (should return {"isAdmin":true})
curl -s http://localhost:3000/api/admin/me -b /tmp/cookies.txt
```

### Analytics Data Types
```bash
# Check all count values are numbers
curl -s http://localhost:3000/api/admin/analytics/events \
  -b /tmp/cookies.txt | jq '.[] | .count | type' | sort | uniq

# Should output only: "number"

# Check all visitor values are numbers
curl -s http://localhost:3000/api/admin/analytics/overview \
  -b /tmp/cookies.txt | jq '.allTime | values | type' | sort | uniq
```

### Session Persistence
```bash
# On VPS: Check session table
psql $DATABASE_URL -c "SELECT COUNT(*) FROM session WHERE expire > NOW();"

# Should return: 1 or more

# Check session content
psql $DATABASE_URL -c "SELECT sid, sess, expire FROM session LIMIT 1;"
```

### Database Connection
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"

# List tables
psql $DATABASE_URL -c "\dt"

# Check session table
psql $DATABASE_URL -c "SELECT * FROM session LIMIT 1;"
```

---

## 🆘 TROUBLESHOOTING QUICK FIXES

### Session Not Working
```bash
# Clear old sessions
psql $DATABASE_URL -c "DELETE FROM session WHERE expire < NOW();"

# Restart PM2
pm2 restart all --update-env

# Check logs
pm2 logs | grep -i "session"
```

### Admin Login Fails
```bash
# Verify password is correct
echo $ADMIN_PASSWORD

# Test login with correct password
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password":"'$ADMIN_PASSWORD'"}'

# Check for typos or extra spaces
echo "$ADMIN_PASSWORD" | od -c
```

### Analytics Returns String Types
```bash
# Verify Number() wrappers are in code
grep "Number(row.count" server/controllers/analytics.ts

# Should show 3+ matches

# If missing, rebuild and restart
npm run build
pm2 restart all --update-env
```

### Cookies Not Secure in Production
```bash
# Check NODE_ENV
echo $NODE_ENV

# Should be: production

# If not:
export NODE_ENV=production

# Restart PM2
pm2 restart all --update-env

# Check cookie headers
curl -i https://bernardinomartinhvac.com/api/admin/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"password":"test"}' | grep -i "set-cookie"

# Should include: Secure flag
```

### Zod Validation Errors
```bash
# Check application logs
pm2 logs | grep -i "zod\|validation"

# If analytics errors, verify Number() conversion
curl http://localhost:3000/api/admin/analytics/events \
  -b /tmp/cookies.txt -s | jq '.[0]'

# All numeric fields should be numbers, not strings
```

---

## 📊 MONITORING COMMANDS

### Real-time Log Monitoring
```bash
# Watch all logs
pm2 logs

# Watch specific patterns
pm2 logs | grep -i "error"
pm2 logs | grep -i "session"
pm2 logs | grep -i "login"

# Tail logs with timestamps
pm2 logs --lines 100 | tail -50
```

### Performance Metrics
```bash
# Monitor database session table growth
watch -n 5 "psql $DATABASE_URL -c 'SELECT COUNT(*) FROM session;'"

# Check database size
du -sh /var/lib/postgresql/

# Monitor disk space
df -h /
```

### Session Monitoring
```bash
# Count active sessions
psql $DATABASE_URL -c "SELECT COUNT(*) FROM session WHERE expire > NOW();"

# Find oldest session
psql $DATABASE_URL -c "SELECT MIN(expire) FROM session;"

# Find newest session
psql $DATABASE_URL -c "SELECT MAX(expire) FROM session;"

# Average session age
psql $DATABASE_URL -c "SELECT AVG(EXTRACT(EPOCH FROM (NOW() - expire))) FROM session;"
```

---

## 🔄 ROLLBACK PROCEDURE

### Quick Rollback
```bash
# SSH to VPS
ssh michael@160.153.176.159

cd ~/bernardino-martin-hvac

# Revert to previous version
git revert HEAD
git push origin main

# OR reset to previous
git reset --hard HEAD~1

# Rebuild
npm run build

# Restart
pm2 restart all --update-env

# Verify
pm2 logs --lines 20
```

### Manual Rollback
```bash
# SSH to VPS
ssh michael@160.153.176.159

# Check git log
git log --oneline | head -10

# Reset to specific commit
git reset --hard <commit-hash>

# Rebuild
npm run build

# Restart
pm2 restart all --update-env
```

---

## 📈 DEPLOYMENT SUCCESS INDICATORS

✅ All should be TRUE:

```bash
# 1. Build succeeds
npm run build 2>&1 | tail -1 | grep -q "successfully"

# 2. Health check works
curl -s http://localhost:3000/health | grep -q "ok"

# 3. Admin login works
curl -s -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password":"test"}' | grep -q "success"

# 4. Protected route works with session
curl -s http://localhost:3000/api/admin/me -b /tmp/cookies.txt | grep -q "isAdmin"

# 5. Analytics returns numbers
curl -s http://localhost:3000/api/admin/analytics/events \
  -b /tmp/cookies.txt | jq '.[] | .count | select(type != "number")' | grep -q "."

# If all pass with no output from #5, then SUCCESS
```

---

## 🎯 DEPLOYMENT SUMMARY

| Phase | Time | Commands |
|-------|------|----------|
| **Build** | 2-3 min | `npm run build` |
| **Test** | 3-5 min | `npm run dev` + curl tests |
| **Commit** | 1 min | `git add/commit/push` |
| **Deploy** | 5-10 min | SSH + pull + build + restart |
| **Verify** | 2-3 min | curl + jq checks |
| **TOTAL** | 15-25 min | - |

---

## 📞 HELP COMMANDS

```bash
# Show this quick reference
cat QUICK_REFERENCE.md

# Show full deployment guide
cat DEPLOYMENT_TESTING_GUIDE.md

# Show backend fixes
cat BACKEND_FIXES_SUMMARY.md

# Show environment setup
cat PRODUCTION_ENV_SETUP.md

# Show implementation details
cat FIXES_IMPLEMENTATION_SUMMARY.md
```

---

## ⚡ COPY-PASTE DEPLOYMENT SCRIPT

```bash
#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Build locally
echo "📦 Building..."
npm run build

# Push changes
echo "📤 Pushing..."
git add -A && git commit -m "fix: Backend critical issues" && git push

# Deploy to production
echo "🌐 Deploying to production..."
ssh michael@160.153.176.159 << 'DEPLOY_COMMANDS'
cd ~/bernardino-martin-hvac
git pull origin main
npm run build
pm2 restart all --update-env
sleep 2
pm2 status
DEPLOY_COMMANDS

# Verify production
echo "✅ Verifying deployment..."
curl https://bernardinomartinhvac.com/health

echo "✨ DEPLOYMENT COMPLETE!"
```

Save as `deploy.sh` and run: `bash deploy.sh`

---

## 📝 NOTES

- All commands assume you're in the `~/bernardino-martin-hvac` directory
- Replace `your-password` with actual ADMIN_PASSWORD
- Replace `160.153.176.159` with actual server IP if different
- Check PM2 process ID with `pm2 list` if using different process ID than 0

---

**Last Updated**: 2026-05-06
**Version**: 1.0
**Status**: ✅ Production Ready
