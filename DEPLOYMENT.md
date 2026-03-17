# Vercel Deployment Guide for Bookooda

## Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)

## Deployment Steps

### 1. Push to GitHub
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Bookooda travel platform"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/bookooda.git

# Push to GitHub
git push -u origin main
```

### 2. Deploy on Vercel

#### Option A: Via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Vite settings
5. Click "Deploy"

#### Option B: Via Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (run from project root)
vercel

# For production deployment
vercel --prod
```

### 3. Environment Variables (if needed)
If you add any API keys or environment variables later:
1. Go to your project settings on Vercel
2. Navigate to "Environment Variables"
3. Add your variables (e.g., `VITE_API_KEY`)

### 4. Custom Domain (Optional)
1. Go to project settings
2. Click "Domains"
3. Add your custom domain (e.g., bookooda.com)
4. Follow DNS configuration instructions

## Configuration Details

The `vercel.json` file includes:
- **Build Command**: `npm run build` (creates production build)
- **Output Directory**: `dist` (Vite's default output)
- **Framework**: Vite (auto-detected)
- **Rewrites**: SPA routing support (all routes → index.html)

## Automatic Deployments

Once connected to GitHub:
- **Push to main branch** → Automatic production deployment
- **Push to other branches** → Preview deployments
- **Pull requests** → Preview deployments with unique URLs

## Useful Commands

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs

# Remove deployment
vercel remove [deployment-url]
```

## Notes
- Build time: ~1-2 minutes
- Free tier includes: Unlimited deployments, 100GB bandwidth/month
- Your app will be available at: `https://your-project-name.vercel.app`
