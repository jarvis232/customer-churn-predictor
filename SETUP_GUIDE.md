# 🚀 Setup Guide for Customer Churn Predictor

This guide will help you set up and run the Customer Churn Predictor on your local machine or deploy it to GitHub Pages.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)
- A code editor (VS Code recommended)

## 🏗️ Project Structure

After setup, your project should look like this:

```
customer-churn-predictor/
│
├── public/
│   └── index.html
│
├── src/
│   ├── churn-predictor.jsx
│   ├── index.js
│   └── index.css
│
├── data/
│   ├── customer_churn_data.csv
│   └── customer_test_sample.csv
│
├── .gitignore
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── README.md
├── LICENSE
└── SETUP_GUIDE.md
```

## 🛠️ Local Setup Instructions

### Step 1: Create Project Directory

```bash
mkdir customer-churn-predictor
cd customer-churn-predictor
```

### Step 2: Initialize React App

**Option A: Using Create React App**
```bash
npx create-react-app .
```

**Option B: Manual Setup** (if you have all the files)
```bash
npm init -y
```

### Step 3: Copy Project Files

Copy all the provided files into their respective directories:

- Copy `churn-predictor.jsx` to `src/`
- Copy `index.js` to `src/`
- Copy `index.css` to `src/`
- Copy `index.html` to `public/`
- Copy `customer_churn_data.csv` and `customer_test_sample.csv` to `data/`
- Copy configuration files to root directory

### Step 4: Install Dependencies

```bash
npm install react react-dom react-scripts lucide-react
npm install -D tailwindcss postcss autoprefixer
```

Or use the provided package.json:
```bash
npm install
```

### Step 5: Initialize Tailwind CSS

If not using the provided config:
```bash
npx tailwindcss init -p
```

### Step 6: Start Development Server

```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

## 🌐 Deploying to GitHub

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `customer-churn-predictor`
3. Don't initialize with README (we already have one)

### Step 2: Initialize Git and Push

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Customer Churn Predictor"

# Add remote repository
git remote add origin https://github.com/yourusername/customer-churn-predictor.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy to GitHub Pages

**Option A: Using gh-pages package**

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/customer-churn-predictor",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

**Option B: Using GitHub Actions**

1. Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
    
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

2. Push and it will auto-deploy!

### Step 4: Enable GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" section
3. Select source: `gh-pages` branch
4. Save and wait for deployment
5. Your app will be live at `https://yourusername.github.io/customer-churn-predictor`

## 🔧 Troubleshooting

### Common Issues

**Issue: "Module not found: Can't resolve 'lucide-react'"**
```bash
npm install lucide-react
```

**Issue: Tailwind styles not working**
```bash
# Make sure you have the correct imports in index.css
# Rebuild the project
npm run build
```

**Issue: Port 3000 already in use**
```bash
# Use a different port
PORT=3001 npm start
```

**Issue: Build fails**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📱 Running in Production Mode

```bash
# Build for production
npm run build

# Serve the build folder
npx serve -s build
```

## 🧪 Testing the Application

1. **Start the app**: `npm start`
2. **Upload sample data**: Use the "Generate Sample Data" button
3. **Explore data**: Check statistics and data preview
4. **Train model**: Click "Start Training"
5. **View results**: Check accuracy and metrics
6. **Make predictions**: Enter customer details and predict

## 📊 Using Custom Data

To use your own customer data:

1. Prepare a CSV file with required columns (see README.md)
2. Click "Upload CSV" in the app
3. Select your file
4. Proceed with training

## 🔐 Environment Variables

If you need environment variables:

1. Create `.env` file in root:
```
REACT_APP_API_URL=your_api_url
```

2. Access in code:
```javascript
const apiUrl = process.env.REACT_APP_API_URL;
```

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Create React App Documentation](https://create-react-app.dev/)
- [GitHub Pages Documentation](https://pages.github.com/)

## 🆘 Getting Help

If you encounter issues:

1. Check this guide thoroughly
2. Review the [README.md](README.md)
3. Open an issue on GitHub
4. Check existing issues for solutions

## 🎉 Success!

Once setup is complete, you should see the Customer Churn Predictor running in your browser. Enjoy predicting customer churn!

---

**Next Steps:**
- Customize the styling
- Add more features
- Deploy to production
- Share with others!
