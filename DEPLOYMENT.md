# Deployment Guide

This project is a full-stack application with separate frontend and backend. Here's how to deploy it properly:

## Architecture
- **Frontend**: React + Vite (deployed on Vercel)
- **Backend**: Node.js + Express (deployed on Render)
- **Database**: MongoDB Atlas
- **Storage**: Cloudinary

---

## Deployment Option 1: Vercel (Frontend) + Render (Backend)

### Prerequisites
1. **GitHub**: Push code to GitHub repository
2. **Vercel Account**: https://vercel.com
3. **Render Account**: https://render.com
4. **MongoDB Atlas**: Free MongoDB database
5. **Environment Variables**: All secrets configured

### Backend Deployment (Render)

1. **Create Render Web Service**:
   - Connect GitHub repository
   - Select `studio-management-backend` service from `render.yaml`
   - Add environment secrets:
     - `JWT_SECRET`: Random string (generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
     - `MONGO_URI`: MongoDB connection string from Atlas
     - `ADMIN_KEY`: Admin authentication key
     - `STRIPE_SECRET_KEY`: From Stripe dashboard
     - `STRIPE_WEBHOOK_SECRET`: From Stripe dashboard
     - `CLOUDINARY_CLOUD_NAME`: From Cloudinary
     - `CLOUDINARY_API_KEY`: From Cloudinary
     - `CLOUDINARY_API_SECRET`: From Cloudinary

2. **Update `render.yaml`**:
   - After services are deployed, update the URLs:
     - Backend URL: `https://your-backend-name.onrender.com`
     - Frontend URL: `https://your-frontend-name.vercel.app`

### Frontend Deployment (Vercel)

1. **Connect Vercel to GitHub**:
   - Go to https://vercel.com
   - Click "New Project"
   - Select repository: `capstone-project`
   - Configure:
     - Framework Preset: Vite
     - Build Command: `cd client && npm install && npm run build`
     - Output Directory: `client/dist`
     - Environment Variables:
       - `VITE_API_URL`: `https://your-backend-name.onrender.com/api`

2. **Deploy**:
   - Vercel will automatically deploy on push to `main` branch

---

## Deployment Option 2: Full Stack on Render (Alternative)

If you prefer everything on one platform, use only Render:
- Backend: Web Service
- Frontend: Static Site (using `render.yaml` configuration)

---

## Environment Variables

### Backend (Server)
```
NODE_ENV=production
PORT=10000
CLIENT_URL=https://your-frontend-url.vercel.app
JWT_SECRET=<random-secret>
MONGO_URI=<mongodb-atlas-uri>
ADMIN_KEY=<admin-key>
STRIPE_SECRET_KEY=<stripe-key>
STRIPE_WEBHOOK_SECRET=<stripe-webhook>
CLOUDINARY_CLOUD_NAME=<cloudinary-name>
CLOUDINARY_API_KEY=<cloudinary-key>
CLOUDINARY_API_SECRET=<cloudinary-secret>
```

### Frontend (Client)
```
VITE_API_URL=https://your-backend-name.onrender.com/api
```

---

## Troubleshooting

### 404 Errors
- ✅ Fixed in latest version
- Backend properly routes API requests before SPA fallback
- Frontend rewrite rules configured in `vercel.json`

### CORS Errors
- Update `CLIENT_URL` in backend to match frontend URL
- Ensure both URLs are in backend CORS whitelist

### Build Failures
- Node version: `18.x` (specified in root `package.json`)
- Clear npm cache: `npm cache clean --force`
- Reinstall: `npm install` in both `client/` and `server/`

### API Connection Issues
- Verify `VITE_API_URL` is set correctly
- Check if backend is running and healthy
- Test API endpoint: `https://your-backend.onrender.com/health`

---

## Local Testing

Before deploying, test locally:

```bash
# Terminal 1: Start Backend
cd server
npm install
npm start

# Terminal 2: Start Frontend
cd client
npm install
npm run dev

# Terminal 3: MongoDB
mongod
```

Visit: `http://localhost:5173`

---

## Post-Deployment Checklist

- [ ] Backend environment variables set
- [ ] Frontend `VITE_API_URL` configured
- [ ] MongoDB connection working
- [ ] Stripe keys configured
- [ ] Cloudinary setup complete
- [ ] CORS properly configured
- [ ] Health check endpoint responding
- [ ] Login/Registration working
- [ ] File uploads working
- [ ] Payments functional

