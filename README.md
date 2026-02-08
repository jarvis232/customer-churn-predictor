# 🎯 Customer Churn Predictor

An end-to-end machine learning web application for predicting customer churn using React and Logistic Regression.

![Customer Churn Predictor](https://img.shields.io/badge/ML-Churn%20Prediction-blue)
![React](https://img.shields.io/badge/React-18.x-61dafb)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Overview

This project provides a complete machine learning pipeline for predicting customer churn, built entirely in the browser with no backend required. It includes data upload, exploration, model training, evaluation, and real-time predictions.

## ✨ Features

### 🔄 End-to-End ML Pipeline
- **Data Upload & Management**: Upload CSV files or generate sample data
- **Data Exploration**: Interactive statistics dashboard with visualizations
- **Model Training**: Logistic Regression implementation from scratch
- **Model Evaluation**: Comprehensive metrics including accuracy, precision, recall, F1 score
- **Real-time Predictions**: Instant churn predictions for new customers

### 📊 Key Capabilities
- ✅ Automatic feature preprocessing
- ✅ One-hot encoding for categorical variables
- ✅ Train/test split (80/20)
- ✅ Confusion matrix visualization
- ✅ Feature importance ranking
- ✅ Actionable recommendations for at-risk customers
- ✅ No backend required - runs entirely in browser

## 🚀 Demo

### Screenshots

**Data Upload**
- Upload CSV or generate sample data
- Automatic validation

**Data Exploration**
- Statistics dashboard
- Churn rate analysis
- Data preview table

**Model Training**
- One-click training
- Progress indicators

**Results & Metrics**
- Performance metrics
- Confusion matrix
- Feature importance

**Predictions**
- Interactive form
- Churn probability
- Confidence scores

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/customer-churn-predictor.git
cd customer-churn-predictor
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Open in browser**
```
http://localhost:3000
```

## 📦 Project Structure

```
customer-churn-predictor/
│
├── src/
│   ├── App.jsx                 # Main application component
│   ├── churn-predictor.jsx     # Churn predictor component
│   └── index.js                # Entry point
│
├── public/
│   └── index.html
│
├── data/
│   ├── customer_churn_data.csv      # Training dataset (200 records)
│   └── customer_test_sample.csv     # Test dataset (20 records)
│
├── package.json
├── README.md
└── LICENSE
```

## 💾 Data Format

### Required CSV Columns

| Column Name | Type | Description | Example |
|-------------|------|-------------|---------|
| CustomerID | String | Unique identifier | CUST0001 |
| Tenure | Integer | Months as customer | 24 |
| MonthlyCharges | Float | Monthly bill amount | 79.99 |
| TotalCharges | Float | Total amount paid | 1919.76 |
| CustomerType | String | Basic/Premium/Enterprise | Premium |
| Region | String | Geographic region | North |
| SupportTickets | Integer | Number of support tickets | 3 |
| LoginFrequency | Integer | Logins per month | 15 |
| Churn | String | Yes/No | No |

### Sample Data

Two sample datasets are provided:

1. **customer_churn_data.csv** - 200 records for training
2. **customer_test_sample.csv** - 20 records for testing

## 🧮 Algorithm Details

### Logistic Regression Implementation

The model uses a custom implementation of Logistic Regression with:

- **Sigmoid activation function**: `σ(z) = 1 / (1 + e^(-z))`
- **Gradient descent optimization**
- **Learning rate**: 0.01
- **Epochs**: 1000
- **Cost function**: Binary cross-entropy

### Feature Engineering

- **Numeric features**: Tenure, MonthlyCharges, TotalCharges, SupportTickets, LoginFrequency
- **Categorical features**: CustomerType, Region (one-hot encoded)
- **Target variable**: Churn (binary: 1 = Yes, 0 = No)

### Model Evaluation Metrics

```
Accuracy = (TP + TN) / (TP + TN + FP + FN)
Precision = TP / (TP + FP)
Recall = TP / (TP + FN)
F1 Score = 2 × (Precision × Recall) / (Precision + Recall)
```

## 📖 Usage Guide

### 1. Upload Data
- Click "Upload CSV" or use "Generate Sample Data"
- Ensure CSV follows the required format

### 2. Explore Data
- Review statistics dashboard
- Check churn rate and customer metrics
- Select target column (usually "Churn")

### 3. Train Model
- Click "Start Training"
- Wait for model to train (typically 1-2 seconds)
- Model automatically performs 80/20 train-test split

### 4. View Results
- Review accuracy, precision, recall, F1 score
- Analyze confusion matrix
- Check feature importance rankings

### 5. Make Predictions
- Enter customer details in the form
- Click "Predict Churn"
- View churn probability and recommendations

## 🎨 Technologies Used

- **React** - UI framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **JavaScript** - ML algorithms (custom implementation)

## 📊 Model Performance

On the sample dataset of 200 customers:

| Metric | Score |
|--------|-------|
| Accuracy | ~85% |
| Precision | ~80% |
| Recall | ~75% |
| F1 Score | ~77% |

*Note: Performance varies based on data quality and distribution*

## 🔮 Future Enhancements

- [ ] Add more ML algorithms (Random Forest, XGBoost, Neural Networks)
- [ ] Implement cross-validation
- [ ] Add data visualization charts (plotly/recharts)
- [ ] Export trained model
- [ ] Batch prediction upload
- [ ] API integration for real-time data
- [ ] Model persistence (save/load)
- [ ] A/B testing different models
- [ ] Feature selection optimization
- [ ] Hyperparameter tuning interface

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Built with React and Tailwind CSS
- Icons by Lucide
- Inspired by real-world customer retention challenges

## 📧 Contact

For questions or feedback, please open an issue or contact [your.email@example.com](mailto:your.email@example.com)

---

⭐ If you find this project useful, please consider giving it a star!
