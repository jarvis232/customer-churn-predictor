import React, { useState } from 'react';
import { Upload, BarChart3, Brain, TrendingUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const ChurnPredictor = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [data, setData] = useState(null);
  const [features, setFeatures] = useState([]);
  const [targetColumn, setTargetColumn] = useState('');
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [featureImportance, setFeatureImportance] = useState(null);
  const [loading, setLoading] = useState(false);

  // Parse CSV data
  const parseCSV = (text) => {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const rows = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const row = {};
      headers.forEach((header, i) => {
        row[header] = values[i];
      });
      return row;
    });
    return { headers, rows };
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const { headers, rows } = parseCSV(event.target.result);
        setData(rows);
        setFeatures(headers);
        setActiveTab('explore');
      };
      reader.readAsText(file);
    }
  };

  // Generate sample data
  const generateSampleData = () => {
    const sampleData = [];
    const customerTypes = ['Basic', 'Premium', 'Enterprise'];
    const regions = ['North', 'South', 'East', 'West'];
    
    for (let i = 0; i < 200; i++) {
      const tenure = Math.floor(Math.random() * 60) + 1;
      const monthlyCharges = Math.random() * 100 + 20;
      const totalCharges = tenure * monthlyCharges * (0.9 + Math.random() * 0.2);
      const supportTickets = Math.floor(Math.random() * 10);
      const loginFrequency = Math.floor(Math.random() * 30);
      
      // Churn logic: higher charges, low tenure, many tickets = higher churn
      const churnProb = (
        (monthlyCharges > 80 ? 0.3 : 0) +
        (tenure < 12 ? 0.3 : 0) +
        (supportTickets > 5 ? 0.2 : 0) +
        (loginFrequency < 5 ? 0.2 : 0)
      );
      
      sampleData.push({
        CustomerID: `CUST${String(i + 1).padStart(4, '0')}`,
        Tenure: tenure.toString(),
        MonthlyCharges: monthlyCharges.toFixed(2),
        TotalCharges: totalCharges.toFixed(2),
        CustomerType: customerTypes[Math.floor(Math.random() * customerTypes.length)],
        Region: regions[Math.floor(Math.random() * regions.length)],
        SupportTickets: supportTickets.toString(),
        LoginFrequency: loginFrequency.toString(),
        Churn: Math.random() < churnProb ? 'Yes' : 'No'
      });
    }
    
    setData(sampleData);
    setFeatures(Object.keys(sampleData[0]));
    setTargetColumn('Churn');
    setActiveTab('explore');
  };

  // Preprocess data for training
  const preprocessData = (rows, target) => {
    const numericFeatures = ['Tenure', 'MonthlyCharges', 'TotalCharges', 'SupportTickets', 'LoginFrequency'];
    const categoricalFeatures = ['CustomerType', 'Region'];
    
    // One-hot encode categorical variables
    const uniqueValues = {};
    categoricalFeatures.forEach(feature => {
      uniqueValues[feature] = [...new Set(rows.map(r => r[feature]))];
    });
    
    const processedData = rows.map(row => {
      const processed = {};
      
      // Add numeric features (normalized)
      numericFeatures.forEach(feature => {
        if (row[feature]) {
          processed[feature] = parseFloat(row[feature]) || 0;
        }
      });
      
      // One-hot encode categorical features
      categoricalFeatures.forEach(feature => {
        uniqueValues[feature].forEach(value => {
          processed[`${feature}_${value}`] = row[feature] === value ? 1 : 0;
        });
      });
      
      // Target variable
      processed.target = row[target] === 'Yes' ? 1 : 0;
      
      return processed;
    });
    
    return processedData;
  };

  // Simple logistic regression implementation
  const trainLogisticRegression = (X, y, learningRate = 0.01, epochs = 1000) => {
    const m = X.length;
    const n = X[0].length;
    let weights = new Array(n).fill(0);
    let bias = 0;
    
    const sigmoid = (z) => 1 / (1 + Math.exp(-z));
    
    for (let epoch = 0; epoch < epochs; epoch++) {
      const currentBias = bias; // Capture bias value for this iteration
      const currentWeights = [...weights]; // Capture weights for this iteration
      let predictions = X.map(x => {
        const z = x.reduce((sum, xi, i) => sum + xi * currentWeights[i], 0) + currentBias;
        return sigmoid(z);
      });
      
      // Gradient descent
      let dw = new Array(n).fill(0);
      let db = 0;
      
      for (let i = 0; i < m; i++) {
        const error = predictions[i] - y[i];
        db += error;
        for (let j = 0; j < n; j++) {
          dw[j] += error * X[i][j];
        }
      }
      
      for (let j = 0; j < n; j++) {
        weights[j] -= (learningRate / m) * dw[j];
      }
      bias -= (learningRate / m) * db;
    }
    
    return { weights, bias, sigmoid };
  };

  // Train model
  const trainModel = () => {
    if (!data || !targetColumn) return;
    
    setLoading(true);
    setTimeout(() => {
      const processed = preprocessData(data, targetColumn);
      
      // Split into train/test
      const shuffled = processed.sort(() => Math.random() - 0.5);
      const splitIndex = Math.floor(shuffled.length * 0.8);
      const trainData = shuffled.slice(0, splitIndex);
      const testData = shuffled.slice(splitIndex);
      
      // Prepare X and y
      const featureNames = Object.keys(trainData[0]).filter(k => k !== 'target');
      const X_train = trainData.map(row => featureNames.map(f => row[f]));
      const y_train = trainData.map(row => row.target);
      const X_test = testData.map(row => featureNames.map(f => row[f]));
      const y_test = testData.map(row => row.target);
      
      // Train model
      const trainedModel = trainLogisticRegression(X_train, y_train);
      
      // Make predictions
      const testPredictions = X_test.map(x => {
        const z = x.reduce((sum, xi, i) => sum + xi * trainedModel.weights[i], 0) + trainedModel.bias;
        const prob = trainedModel.sigmoid(z);
        return { probability: prob, prediction: prob > 0.5 ? 1 : 0 };
      });
      
      // Calculate metrics
      let tp = 0, tn = 0, fp = 0, fn = 0;
      testPredictions.forEach((pred, i) => {
        if (pred.prediction === 1 && y_test[i] === 1) tp++;
        else if (pred.prediction === 0 && y_test[i] === 0) tn++;
        else if (pred.prediction === 1 && y_test[i] === 0) fp++;
        else fn++;
      });
      
      const accuracy = (tp + tn) / (tp + tn + fp + fn);
      const precision = tp / (tp + fp) || 0;
      const recall = tp / (tp + fn) || 0;
      const f1 = 2 * (precision * recall) / (precision + recall) || 0;
      
      setMetrics({ accuracy, precision, recall, f1, tp, tn, fp, fn });
      
      // Feature importance (absolute weights)
      const importance = featureNames.map((name, i) => ({
        feature: name,
        importance: Math.abs(trainedModel.weights[i])
      })).sort((a, b) => b.importance - a.importance).slice(0, 10);
      
      setFeatureImportance(importance);
      setModel({ ...trainedModel, featureNames });
      setLoading(false);
      setActiveTab('results');
    }, 1500);
  };

  // Predict for new data
  const predictChurn = (customerData) => {
    if (!model) return null;
    
    const processed = preprocessData([customerData], targetColumn)[0];
    const x = model.featureNames.map(f => processed[f] || 0);
    const z = x.reduce((sum, xi, i) => sum + xi * model.weights[i], 0) + model.bias;
    const probability = model.sigmoid(z);
    
    return {
      churnProbability: probability,
      prediction: probability > 0.5 ? 'Churn' : 'Stay',
      confidence: probability > 0.5 ? probability : 1 - probability
    };
  };

  // Calculate statistics
  const getStatistics = () => {
    if (!data) return null;
    
    const churnCount = data.filter(r => r[targetColumn] === 'Yes').length;
    const totalCount = data.length;
    const churnRate = (churnCount / totalCount * 100).toFixed(1);
    
    const avgTenure = data.reduce((sum, r) => sum + parseFloat(r.Tenure || 0), 0) / totalCount;
    const avgCharges = data.reduce((sum, r) => sum + parseFloat(r.MonthlyCharges || 0), 0) / totalCount;
    
    return { churnCount, totalCount, churnRate, avgTenure, avgCharges };
  };

  const stats = getStatistics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Brain className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Customer Churn Predictor
            </h1>
          </div>
          <p className="text-gray-600 text-lg">End-to-end ML pipeline for predicting customer churn</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-2 flex gap-2">
          {[
            { id: 'upload', label: 'Data Upload', icon: Upload },
            { id: 'explore', label: 'Explore', icon: BarChart3, disabled: !data },
            { id: 'train', label: 'Train Model', icon: Brain, disabled: !data },
            { id: 'results', label: 'Results', icon: TrendingUp, disabled: !model },
            { id: 'predict', label: 'Predict', icon: CheckCircle, disabled: !model }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && setActiveTab(tab.id)}
              disabled={tab.disabled}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : tab.disabled
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div className="text-center py-12">
              <Upload className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Upload Customer Data</h2>
              <p className="text-gray-600 mb-8">Upload a CSV file with customer information including churn status</p>
              
              <div className="max-w-md mx-auto">
                <label className="block mb-4">
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 hover:border-blue-500 cursor-pointer transition-colors">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <p className="text-blue-600 font-medium">Click to upload CSV</p>
                    <p className="text-gray-500 text-sm mt-2">or drag and drop</p>
                  </div>
                </label>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">or</span>
                  </div>
                </div>
                
                <button
                  onClick={generateSampleData}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all shadow-md"
                >
                  Generate Sample Data
                </button>
              </div>
              
              <div className="mt-12 bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="font-semibold mb-3 text-left">Expected CSV Format:</h3>
                <div className="text-sm text-left space-y-2 text-gray-700">
                  <p><strong>Required columns:</strong> CustomerID, Tenure, MonthlyCharges, TotalCharges, Churn (Yes/No)</p>
                  <p><strong>Optional columns:</strong> CustomerType, Region, SupportTickets, LoginFrequency, etc.</p>
                </div>
              </div>
            </div>
          )}

          {/* Explore Tab */}
          {activeTab === 'explore' && data && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Data Exploration</h2>
              
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md">
                  <p className="text-blue-100 text-sm mb-1">Total Customers</p>
                  <p className="text-3xl font-bold">{stats.totalCount.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg shadow-md">
                  <p className="text-red-100 text-sm mb-1">Churned</p>
                  <p className="text-3xl font-bold">{stats.churnCount}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-md">
                  <p className="text-purple-100 text-sm mb-1">Churn Rate</p>
                  <p className="text-3xl font-bold">{stats.churnRate}%</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md">
                  <p className="text-green-100 text-sm mb-1">Avg Tenure</p>
                  <p className="text-3xl font-bold">{stats.avgTenure.toFixed(1)} mo</p>
                </div>
              </div>

              {/* Data Preview */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Data Preview (First 5 Rows)</h3>
                <div className="overflow-x-auto border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {features.map(feature => (
                          <th key={feature} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {feature}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.slice(0, 5).map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          {features.map(feature => (
                            <td key={feature} className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                              {row[feature]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Target Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Target Column (Churn Indicator)
                </label>
                <select
                  value={targetColumn}
                  onChange={(e) => setTargetColumn(e.target.value)}
                  className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose column...</option>
                  {features.map(feature => (
                    <option key={feature} value={feature}>{feature}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setActiveTab('train')}
                disabled={!targetColumn}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-md"
              >
                Proceed to Training
              </button>
            </div>
          )}

          {/* Train Tab */}
          {activeTab === 'train' && data && (
            <div className="text-center py-12">
              <Brain className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Train Churn Prediction Model</h2>
              <p className="text-gray-600 mb-8">Using Logistic Regression with 80/20 train-test split</p>
              
              <div className="max-w-2xl mx-auto bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold mb-4">Model Configuration</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-left">
                    <p className="text-gray-600">Algorithm:</p>
                    <p className="font-medium">Logistic Regression</p>
                  </div>
                  <div className="text-left">
                    <p className="text-gray-600">Training Data:</p>
                    <p className="font-medium">{Math.floor(data.length * 0.8)} samples</p>
                  </div>
                  <div className="text-left">
                    <p className="text-gray-600">Test Data:</p>
                    <p className="font-medium">{Math.ceil(data.length * 0.2)} samples</p>
                  </div>
                  <div className="text-left">
                    <p className="text-gray-600">Features:</p>
                    <p className="font-medium">Auto-detected numeric & categorical</p>
                  </div>
                </div>
              </div>

              <button
                onClick={trainModel}
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-lg font-medium text-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Training Model...
                  </span>
                ) : (
                  'Start Training'
                )}
              </button>
            </div>
          )}

          {/* Results Tab */}
          {activeTab === 'results' && metrics && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Model Performance</h2>
              
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md">
                  <p className="text-green-100 text-sm mb-1">Accuracy</p>
                  <p className="text-3xl font-bold">{(metrics.accuracy * 100).toFixed(1)}%</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md">
                  <p className="text-blue-100 text-sm mb-1">Precision</p>
                  <p className="text-3xl font-bold">{(metrics.precision * 100).toFixed(1)}%</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-md">
                  <p className="text-purple-100 text-sm mb-1">Recall</p>
                  <p className="text-3xl font-bold">{(metrics.recall * 100).toFixed(1)}%</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6 rounded-lg shadow-md">
                  <p className="text-indigo-100 text-sm mb-1">F1 Score</p>
                  <p className="text-3xl font-bold">{(metrics.f1 * 100).toFixed(1)}%</p>
                </div>
              </div>

              {/* Confusion Matrix */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Confusion Matrix</h3>
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  <div className="bg-green-50 border-2 border-green-200 p-6 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">True Negatives</p>
                    <p className="text-3xl font-bold text-green-600">{metrics.tn}</p>
                  </div>
                  <div className="bg-orange-50 border-2 border-orange-200 p-6 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">False Positives</p>
                    <p className="text-3xl font-bold text-orange-600">{metrics.fp}</p>
                  </div>
                  <div className="bg-orange-50 border-2 border-orange-200 p-6 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">False Negatives</p>
                    <p className="text-3xl font-bold text-orange-600">{metrics.fn}</p>
                  </div>
                  <div className="bg-green-50 border-2 border-green-200 p-6 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">True Positives</p>
                    <p className="text-3xl font-bold text-green-600">{metrics.tp}</p>
                  </div>
                </div>
              </div>

              {/* Feature Importance */}
              {featureImportance && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Top Feature Importance</h3>
                  <div className="space-y-3">
                    {featureImportance.map((feature, i) => {
                      const maxImportance = featureImportance[0].importance;
                      const percentage = (feature.importance / maxImportance) * 100;
                      
                      return (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{feature.feature}</span>
                            <span className="text-gray-600">{feature.importance.toFixed(3)}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-8">
                <button
                  onClick={() => setActiveTab('predict')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
                >
                  Make Predictions
                </button>
              </div>
            </div>
          )}

          {/* Predict Tab */}
          {activeTab === 'predict' && model && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Predict Customer Churn</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Form */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Enter Customer Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Customer ID</label>
                      <input
                        type="text"
                        id="pred-CustomerID"
                        placeholder="CUST0001"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tenure (months)</label>
                      <input
                        type="number"
                        id="pred-Tenure"
                        placeholder="12"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Charges ($)</label>
                      <input
                        type="number"
                        id="pred-MonthlyCharges"
                        step="0.01"
                        placeholder="79.99"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Charges ($)</label>
                      <input
                        type="number"
                        id="pred-TotalCharges"
                        step="0.01"
                        placeholder="959.88"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Customer Type</label>
                      <select
                        id="pred-CustomerType"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Basic">Basic</option>
                        <option value="Premium">Premium</option>
                        <option value="Enterprise">Enterprise</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                      <select
                        id="pred-Region"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="North">North</option>
                        <option value="South">South</option>
                        <option value="East">East</option>
                        <option value="West">West</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Support Tickets</label>
                      <input
                        type="number"
                        id="pred-SupportTickets"
                        placeholder="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Login Frequency (per month)</label>
                      <input
                        type="number"
                        id="pred-LoginFrequency"
                        placeholder="15"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      const customerData = {
                        CustomerID: document.getElementById('pred-CustomerID').value || 'CUST0001',
                        Tenure: document.getElementById('pred-Tenure').value || '12',
                        MonthlyCharges: document.getElementById('pred-MonthlyCharges').value || '79.99',
                        TotalCharges: document.getElementById('pred-TotalCharges').value || '959.88',
                        CustomerType: document.getElementById('pred-CustomerType').value,
                        Region: document.getElementById('pred-Region').value,
                        SupportTickets: document.getElementById('pred-SupportTickets').value || '3',
                        LoginFrequency: document.getElementById('pred-LoginFrequency').value || '15',
                        Churn: 'No' // Placeholder
                      };
                      
                      const result = predictChurn(customerData);
                      setPredictions(result);
                    }}
                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
                  >
                    Predict Churn
                  </button>
                </div>

                {/* Prediction Result */}
                <div>
                  <h3 className="font-semibold mb-4">Prediction Result</h3>
                  {predictions ? (
                    <div className="space-y-4">
                      <div className={`p-8 rounded-lg text-center ${
                        predictions.prediction === 'Churn'
                          ? 'bg-gradient-to-br from-red-500 to-red-600'
                          : 'bg-gradient-to-br from-green-500 to-green-600'
                      } text-white`}>
                        {predictions.prediction === 'Churn' ? (
                          <XCircle className="w-16 h-16 mx-auto mb-3" />
                        ) : (
                          <CheckCircle className="w-16 h-16 mx-auto mb-3" />
                        )}
                        <h4 className="text-2xl font-bold mb-2">
                          {predictions.prediction === 'Churn' ? 'High Churn Risk' : 'Low Churn Risk'}
                        </h4>
                        <p className="text-lg opacity-90">
                          {predictions.prediction === 'Churn' 
                            ? 'Customer likely to churn'
                            : 'Customer likely to stay'}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">Churn Probability</span>
                            <span className="text-gray-600">{(predictions.churnProbability * 100).toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                              className={`h-4 rounded-full transition-all ${
                                predictions.churnProbability > 0.5
                                  ? 'bg-gradient-to-r from-red-500 to-red-600'
                                  : 'bg-gradient-to-r from-green-500 to-green-600'
                              }`}
                              style={{ width: `${predictions.churnProbability * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">Confidence</span>
                            <span className="text-gray-600">{(predictions.confidence * 100).toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all"
                              style={{ width: `${predictions.confidence * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        {predictions.prediction === 'Churn' && (
                          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                              <div>
                                <p className="font-medium text-yellow-800 mb-1">Recommended Actions:</p>
                                <ul className="text-sm text-yellow-700 space-y-1">
                                  <li>• Reach out with personalized retention offer</li>
                                  <li>• Address any outstanding support issues</li>
                                  <li>• Consider loyalty program enrollment</li>
                                  <li>• Schedule customer success check-in</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-400">
                      <Brain className="w-16 h-16 mx-auto mb-3 opacity-50" />
                      <p>Enter customer details and click predict</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Built with React • Logistic Regression • End-to-End ML Pipeline</p>
        </div>
      </div>
    </div>
  );
};

export default ChurnPredictor;
