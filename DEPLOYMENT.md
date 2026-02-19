# Deployment Guide for FollowUpPing

This guide covers deploying FollowUpPing to production.

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database backed up
- [ ] Frontend built and tested
- [ ] Backend thoroughly tested
- [ ] Security headers configured
- [ ] CORS origins restricted
- [ ] Error logging enabled

## Backend Deployment Options

### Option 1: Heroku (Easiest)

#### Prerequisites
- Heroku account: https://www.heroku.com/
- Heroku CLI installed: https://devcenter.heroku.com/articles/heroku-cli

#### Steps
```bash
# Login to Heroku
heroku login

# Create app
heroku create followupping

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set FLASK_ENV=production
heroku config:set DATABASE_URL=<postgres url from addon>

# Deploy
git push heroku main

# Check logs
heroku logs --tail
```

### Option 2: AWS EC2

1. Create EC2 instance (Ubuntu)
2. SSH into instance
3. Install Python, pip, git
4. Clone repository
5. Set up virtual environment
6. Install dependencies: `pip install -r requirements.txt`
7. Install Gunicorn: `pip install gunicorn`
8. Run: `gunicorn -w 4 app:app`
9. Use Nginx as reverse proxy

### Option 3: DigitalOcean App Platform

1. Sign up at DigitalOcean
2. Connect your GitHub repo
3. Set environment variables
4. Choose Python runtime
5. Deploy!

## Frontend Deployment Options

### Option 1: Netlify (Recommended)

#### Prerequisites
- Netlify account: https://www.netlify.com/
- Git repository connected

#### Steps
```bash
# Navigate to frontend
cd frontend

# Build
npm run build

# Files to deploy: frontend/dist/
```

In Netlify:
1. Click "New site from Git"
2. Choose GitHub repo
3. Build command: `npm run build` (in frontend directory)
4. Publish directory: `frontend/dist`
5. Set environment variable: `VITE_API_BASE_URL=<backend-url>`
6. Deploy!

### Option 2: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel
```

### Option 3: GitHub Pages (Static)

```bash
# In frontend/vite.config.js, set base to:
export default {
  base: '/followupping/',
  // ...
}

# Build and deploy
npm run build
# Push dist/ to gh-pages branch
```

## Database Migration (SQLite to PostgreSQL)

For production, migrate from SQLite to PostgreSQL:

```python
# 1. Update config.py
DATABASE_URL = os.environ.get('DATABASE_URL') or 'sqlite:///followups.db'

# For production PostgreSQL:
# DATABASE_URL = 'postgresql://user:password@localhost/followups_db'

# 2. Export data from SQLite
import sqlite3
conn = sqlite3.connect('followups.db')
cursor = conn.cursor()
cursor.execute('SELECT * FROM followups')
data = cursor.fetchall()

# 3. Import to PostgreSQL using SQLAlchemy
from models import FollowUp
from database import SessionLocal

db = SessionLocal()
for row in data:
    followup = FollowUp(
        person_name=row[1],
        context=row[2],
        followup_date=row[3],
        status=row[4],
        notes=row[5]
    )
    db.add(followup)
db.commit()
```

## Environment Variables

### Backend (Production)

```env
FLASK_ENV=production
DEBUG=False
DATABASE_URL=postgresql://user:password@host:5432/followups
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
SECRET_KEY=<generate-strong-key>
```

### Frontend (Production)

```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_APP_TITLE=FollowUpPing
```

## SSL/HTTPS

- Use free SSL from Let's Encrypt
- Heroku provides free SSL
- Netlify/Vercel provide free SSL
- Configure auto-renewal

## Monitoring & Logging

### Backend
```python
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
```

### Recommended Services
- **Logging**: Sentry (https://sentry.io/)
- **Monitoring**: New Relic, DataDog
- **Analytics**: Google Analytics, Mixpanel

## Performance Optimization

### Backend
```python
# Add caching
from flask_caching import Cache
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

@app.route('/api/followups')
@cache.cached(timeout=300)
def get_followups():
    # ...
```

### Frontend
```bash
# Optimize build
npm run build

# Enable compression in vite.config.js
import compression from 'vite-plugin-compression'

export default {
  plugins: [compression()]
}
```

## Scaling

As your app grows:

1. **Database**: Use read replicas
2. **Backend**: Use load balancer (nginx)
3. **Frontend**: Use CDN (Cloudflare)
4. **Caching**: Redis for session/data caching
5. **Background Jobs**: Celery for async tasks

## Rollback Plan

```bash
# If deployment fails, rollback:
git revert <commit-hash>
git push

# On Heroku:
heroku releases
heroku rollback v<number>
```

## Post-Deployment

1. Test all features on production
2. Set up automated backups
3. Configure alerts
4. Monitor error rates
5. Collect user feedback
6. Plan next iteration

## Cost Estimates (Monthly)

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| Heroku | Free tier | ~$50+ |
| Railway | $5+ | Pay as you go |
| Netlify | ✓ Free | $19+ |
| Vercel | ✓ Free | $20+ |
| DigitalOcean | - | $5-10 |
| AWS | Limited free | Variable |

## Support

For deployment issues:
- Check service documentation
- Review logs carefully
- Ask in GitHub issues
- Search Stack Overflow

---

**Happy deploying!** 🚀
