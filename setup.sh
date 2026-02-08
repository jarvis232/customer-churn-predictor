#!/bin/bash

# Customer Churn Predictor - Quick Setup Script
# This script sets up the project structure automatically

echo "🎯 Customer Churn Predictor - Quick Setup"
echo "========================================"
echo ""

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p src
mkdir -p public
mkdir -p data

# Move files to correct locations (if not already there)
echo "📦 Organizing files..."

# Check if files exist and move them
if [ -f "churn-predictor.jsx" ]; then
    mv churn-predictor.jsx src/
    echo "✓ Moved churn-predictor.jsx to src/"
fi

if [ -f "index.js" ]; then
    mv index.js src/
    echo "✓ Moved index.js to src/"
fi

if [ -f "index.css" ]; then
    mv index.css src/
    echo "✓ Moved index.css to src/"
fi

if [ -f "index.html" ]; then
    mv index.html public/
    echo "✓ Moved index.html to public/"
fi

if [ -f "customer_churn_data.csv" ]; then
    mv customer_churn_data.csv data/
    echo "✓ Moved customer_churn_data.csv to data/"
fi

if [ -f "customer_test_sample.csv" ]; then
    mv customer_test_sample.csv data/
    echo "✓ Moved customer_test_sample.csv to data/"
fi

echo ""
echo "📋 Project structure created:"
echo "customer-churn-predictor/"
echo "├── public/"
echo "│   └── index.html"
echo "├── src/"
echo "│   ├── churn-predictor.jsx"
echo "│   ├── index.js"
echo "│   └── index.css"
echo "├── data/"
echo "│   ├── customer_churn_data.csv"
echo "│   └── customer_test_sample.csv"
echo "├── package.json"
echo "├── tailwind.config.js"
echo "├── postcss.config.js"
echo "├── .gitignore"
echo "├── README.md"
echo "├── SETUP_GUIDE.md"
echo "├── CONTRIBUTING.md"
echo "└── LICENSE"
echo ""

# Install dependencies
echo "📥 Installing dependencies..."
echo "Run: npm install"
echo ""

# Final instructions
echo "✅ Setup complete!"
echo ""
echo "🚀 Next steps:"
echo "1. Run: npm install"
echo "2. Run: npm start"
echo "3. Open: http://localhost:3000"
echo ""
echo "📚 For detailed instructions, see SETUP_GUIDE.md"
echo ""
echo "Happy coding! 🎉"
