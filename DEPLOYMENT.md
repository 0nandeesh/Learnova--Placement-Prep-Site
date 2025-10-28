# PrepNexus Deployment Guide

This guide will help you deploy PrepNexus to production environments.

## 🚀 Quick Deployment

### Frontend Deployment (Vercel)

1. **Connect to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy from frontend directory
   cd frontend
   vercel
   ```

2. **Environment Variables**
   - Set `REACT_APP_API_URL` to your backend URL
   - Example: `https://prepnexus-api.railway.app`

3. **Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

### Backend Deployment (Railway)

1. **Connect to Railway**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Deploy from backend directory
   cd backend
   railway init
   railway up
   ```

2. **Environment Variables**
   - `MONGODB_URL`: Your MongoDB Atlas connection string
   - `DATABASE_NAME`: `prepnexus`
   - `SECRET_KEY`: Generate a secure secret key

3. **Database Setup**
   ```bash
   # Run seed script after deployment
   python seed_data.py
   ```

### Alternative: Render Deployment

#### Frontend (Render)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variable: `REACT_APP_API_URL`

#### Backend (Render)
1. Connect GitHub repository
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. **Create Cluster**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a new cluster
   - Choose your preferred region

2. **Configure Access**
   - Create database user
   - Whitelist IP addresses (0.0.0.0/0 for all IPs)
   - Get connection string

3. **Update Backend**
   ```python
   # Update backend/app/config.py
   MONGODB_URL = "mongodb+srv://username:password@cluster.mongodb.net/"
   ```

### Local MongoDB

1. **Install MongoDB**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install mongodb
   
   # macOS
   brew install mongodb-community
   
   # Windows
   # Download from https://www.mongodb.com/try/download/community
   ```

2. **Start MongoDB**
   ```bash
   # Start MongoDB service
   sudo systemctl start mongod
   
   # Or start manually
   mongod
   ```

## 🔧 Local Development Setup

### Prerequisites
- Node.js 16+
- Python 3.9+
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
cp env.example .env
# Edit .env with your MongoDB URL

# Run seed data
python seed_data.py

# Start server
uvicorn app.main:app --reload
```

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Set environment variables
cp env.example .env
# Edit .env with your API URL

# Start development server
npm start
```

## 🌐 Production Configuration

### Backend Configuration
```python
# backend/app/config.py
class Settings:
    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    DATABASE_NAME: str = os.getenv("DATABASE_NAME", "prepnexus")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
```

### Frontend Configuration
```javascript
// frontend/src/config/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export default API_BASE_URL;
```

## 🔒 Security Considerations

### Backend Security
1. **Environment Variables**
   - Never commit `.env` files
   - Use strong secret keys
   - Rotate keys regularly

2. **CORS Configuration**
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["https://yourdomain.com"],
       allow_credentials=True,
       allow_methods=["GET", "POST"],
       allow_headers=["*"],
   )
   ```

3. **Rate Limiting**
   ```python
   from slowapi import Limiter
   from slowapi.util import get_remote_address
   
   limiter = Limiter(key_func=get_remote_address)
   app.state.limiter = limiter
   
   @app.post("/api/contact/")
   @limiter.limit("5/minute")
   async def submit_contact(request: Request, contact: ContactForm):
       # Your code here
   ```

### Frontend Security
1. **Content Security Policy**
   ```html
   <meta http-equiv="Content-Security-Policy" 
         content="default-src 'self'; script-src 'self' 'unsafe-inline';">
   ```

2. **HTTPS Only**
   - Always use HTTPS in production
   - Redirect HTTP to HTTPS

## 📊 Monitoring and Analytics

### Backend Monitoring
```python
# Add to backend/app/main.py
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    logger.info(f"{request.method} {request.url} - {response.status_code} - {process_time:.4f}s")
    return response
```

### Frontend Analytics
```javascript
// Add to frontend/src/utils/analytics.js
export const trackEvent = (eventName, properties = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
};
```

## 🚀 Performance Optimization

### Backend Optimization
1. **Database Indexing**
   ```python
   # Add indexes for better performance
   await db.dsa_questions.create_index("category")
   await db.dsa_questions.create_index("difficulty")
   await db.dsa_questions.create_index([("title", "text"), ("topic", "text")])
   ```

2. **Caching**
   ```python
   from fastapi_cache import FastAPICache
   from fastapi_cache.backends.redis import RedisBackend
   
   @app.on_event("startup")
   async def startup():
       redis = aioredis.from_url("redis://localhost")
       FastAPICache.init(RedisBackend(redis), prefix="prepnexus-cache")
   ```

### Frontend Optimization
1. **Code Splitting**
   ```javascript
   // Lazy load components
   const DSA = React.lazy(() => import('./pages/DSA'));
   const SQL = React.lazy(() => import('./pages/SQL'));
   ```

2. **Image Optimization**
   ```javascript
   // Use WebP images
   <img src="/images/hero.webp" alt="Hero" />
   ```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy PrepNexus

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./frontend

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        uses: railway-app/railway-deploy@v1
        with:
          railway-token: ${{ secrets.RAILWAY_TOKEN }}
          working-directory: ./backend
```

## 📝 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check backend CORS configuration
   - Verify frontend API URL

2. **Database Connection**
   - Verify MongoDB URL
   - Check network connectivity
   - Ensure database exists

3. **Build Failures**
   - Check Node.js version
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall

4. **Environment Variables**
   - Verify all required variables are set
   - Check variable names and values
   - Restart services after changes

### Logs and Debugging
```bash
# Backend logs
uvicorn app.main:app --reload --log-level debug

# Frontend logs
npm start -- --verbose

# Database logs
mongod --logpath /var/log/mongodb/mongod.log
```

## 📞 Support

If you encounter issues during deployment:

1. Check the logs for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check network connectivity
5. Review the troubleshooting section above

For additional help, please open an issue on our GitHub repository.
