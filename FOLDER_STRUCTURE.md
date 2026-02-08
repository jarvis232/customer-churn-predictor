# 📁 Project Folder Structure Guide

## How to Organize Your Files

### 🎯 Final Folder Structure

Your project should look **exactly** like this:

```
customer-churn-predictor/          ← Main project folder
│
├── 📁 src/                        ← Source code folder
│   ├── churn-predictor.jsx        ← Main React component (the app)
│   ├── index.js                   ← Entry point
│   └── index.css                  ← Tailwind CSS styles
│
├── 📁 public/                     ← Public assets folder
│   └── index.html                 ← HTML template
│
├── 📁 data/                       ← Data files folder
│   ├── customer_churn_data.csv    ← Training data (200 records)
│   └── customer_test_sample.csv   ← Test data (20 records)
│
├── 📄 package.json                ← Dependencies & scripts
├── 📄 tailwind.config.js          ← Tailwind configuration
├── 📄 postcss.config.js           ← PostCSS configuration
├── 📄 .gitignore                  ← Files to ignore in Git
├── 📄 README.md                   ← Project documentation
├── 📄 SETUP_GUIDE.md              ← Setup instructions
├── 📄 CONTRIBUTING.md             ← Contribution guidelines
├── 📄 GITHUB_UPLOAD_GUIDE.md      ← This guide!
├── 📄 LICENSE                     ← MIT License
└── 📄 setup.sh                    ← Setup script (optional)
```

---

## 🗂️ Step-by-Step File Organization

### Step 1: Create Main Folder
```
1. Create a new folder on your Desktop
2. Name it: customer-churn-predictor
```

### Step 2: Create Subfolders Inside
```
Inside customer-churn-predictor, create 3 folders:
├── src
├── public
└── data
```

### Step 3: Place Files in Correct Locations

#### Into `src/` folder, put:
- ✅ churn-predictor.jsx
- ✅ index.js
- ✅ index.css

#### Into `public/` folder, put:
- ✅ index.html

#### Into `data/` folder, put:
- ✅ customer_churn_data.csv
- ✅ customer_test_sample.csv

#### Into main folder (root), put:
- ✅ package.json
- ✅ tailwind.config.js
- ✅ postcss.config.js
- ✅ .gitignore
- ✅ README.md
- ✅ SETUP_GUIDE.md
- ✅ CONTRIBUTING.md
- ✅ GITHUB_UPLOAD_GUIDE.md
- ✅ LICENSE
- ✅ setup.sh

---

## 🖼️ Visual Guide

```
Your Desktop
    │
    └── 📁 customer-churn-predictor/
            │
            ├── 📁 src/
            │   ├── 📄 churn-predictor.jsx  ← 3.5 KB
            │   ├── 📄 index.js             ← 0.2 KB
            │   └── 📄 index.css            ← 0.3 KB
            │
            ├── 📁 public/
            │   └── 📄 index.html           ← 0.5 KB
            │
            ├── 📁 data/
            │   ├── 📄 customer_churn_data.csv      ← 15 KB
            │   └── 📄 customer_test_sample.csv     ← 2 KB
            │
            ├── 📄 package.json             ← 0.7 KB
            ├── 📄 tailwind.config.js       ← 0.4 KB
            ├── 📄 postcss.config.js        ← 0.1 KB
            ├── 📄 .gitignore               ← 0.2 KB
            ├── 📄 README.md                ← 8 KB
            ├── 📄 SETUP_GUIDE.md           ← 6 KB
            ├── 📄 CONTRIBUTING.md          ← 5 KB
            ├── 📄 GITHUB_UPLOAD_GUIDE.md   ← 4 KB
            ├── 📄 LICENSE                  ← 1 KB
            └── 📄 setup.sh                 ← 0.5 KB
```

---

## ✅ Verification Checklist

Before uploading to GitHub, check:

### Folder Structure
- [ ] `src/` folder exists and contains 3 files
- [ ] `public/` folder exists and contains 1 file
- [ ] `data/` folder exists and contains 2 CSV files
- [ ] All config files are in the root folder

### File Names (Case Sensitive!)
- [ ] File names match exactly (including uppercase/lowercase)
- [ ] No extra spaces in file names
- [ ] Extensions are correct (.jsx, .js, .css, .html, .csv, .json, .md)

### File Contents
- [ ] README.md opens and shows documentation
- [ ] package.json contains project dependencies
- [ ] CSV files contain data (not empty)

---

## 🚨 Common Mistakes to Avoid

### ❌ Wrong Structure
```
customer-churn-predictor/
├── churn-predictor.jsx          ❌ Should be in src/
├── index.html                   ❌ Should be in public/
└── customer_churn_data.csv      ❌ Should be in data/
```

### ✅ Correct Structure
```
customer-churn-predictor/
├── src/
│   └── churn-predictor.jsx      ✅ Correct!
├── public/
│   └── index.html               ✅ Correct!
└── data/
    └── customer_churn_data.csv  ✅ Correct!
```

---

## 🖱️ How to Check Your Structure

### On Windows:
1. Open File Explorer
2. Navigate to your project folder
3. Compare with the structure above

### On Mac:
1. Open Finder
2. Navigate to your project folder
3. Compare with the structure above

### On Linux:
```bash
cd customer-churn-predictor
tree
# or
ls -R
```

---

## 📦 Quick Setup Commands

If you want to create the structure automatically:

### Windows (PowerShell):
```powershell
mkdir customer-churn-predictor
cd customer-churn-predictor
mkdir src, public, data
```

### Mac/Linux (Terminal):
```bash
mkdir -p customer-churn-predictor/{src,public,data}
cd customer-churn-predictor
```

---

## 🎬 What Happens After Upload?

After you upload to GitHub, your repository will show:

1. **Root files** (README, package.json, etc.) - visible immediately
2. **Folders** (src, public, data) - clickable to explore
3. **README preview** - displayed at the bottom of the page

---

## 💡 Pro Tips

### Tip 1: Use a File Manager
- Don't upload files one by one
- Drag the entire folder to GitHub

### Tip 2: Check File Sizes
- All files should upload (none are too large)
- GitHub has a 100MB limit per file

### Tip 3: Double Check
- After upload, click through folders on GitHub
- Make sure all files are there

---

## 🆘 Need Help?

If your structure doesn't match:

1. **Delete everything and start fresh**
2. **Follow this guide step-by-step**
3. **Don't skip any steps**
4. **Check twice before uploading**

---

## ✨ You're Ready!

Once your folder structure matches this guide exactly, you can:
1. Upload to GitHub (see GITHUB_UPLOAD_GUIDE.md)
2. Run locally (see SETUP_GUIDE.md)
3. Deploy online (see README.md)

**Good luck! 🚀**
