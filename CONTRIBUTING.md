# 🤝 Contributing to Customer Churn Predictor

First off, thank you for considering contributing to Customer Churn Predictor! It's people like you that make this tool better for everyone.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Guidelines](#coding-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Standards

- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Git
- A GitHub account

### First Contribution

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a branch** for your changes
4. **Make your changes**
5. **Test your changes**
6. **Submit a pull request**

## 💡 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the bug
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Browser/OS information**

**Bug Report Template:**
```markdown
## Bug Description
[Clear description of the bug]

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
[What you expected to happen]

## Actual Behavior
[What actually happened]

## Environment
- OS: [e.g., Windows 10, macOS 12]
- Browser: [e.g., Chrome 98, Firefox 95]
- Node version: [e.g., 16.14.0]
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. Include:

- **Clear title and description**
- **Use case** for the enhancement
- **Examples** of how it would work
- **Benefits** to users

**Enhancement Template:**
```markdown
## Enhancement Description
[Clear description of the enhancement]

## Use Case
[Why is this enhancement needed?]

## Proposed Solution
[How would this work?]

## Alternatives Considered
[Other approaches you've thought about]

## Benefits
[How would this improve the project?]
```

### Code Contributions

Areas where contributions are especially welcome:

#### 🎯 Feature Improvements
- Additional ML algorithms (Random Forest, Neural Networks)
- Advanced data visualizations
- Real-time data integration
- Model export/import functionality
- Batch prediction capabilities

#### 🐛 Bug Fixes
- Any identified bugs in the issue tracker
- Performance improvements
- UI/UX enhancements

#### 📚 Documentation
- Improve README
- Add code comments
- Create tutorials
- Update setup guides

#### 🧪 Testing
- Add unit tests
- Add integration tests
- Improve test coverage

## 🛠️ Development Setup

1. **Fork and clone the repository:**
```bash
git clone https://github.com/yourusername/customer-churn-predictor.git
cd customer-churn-predictor
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create a new branch:**
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

4. **Start development server:**
```bash
npm start
```

5. **Make your changes and test thoroughly**

## 📝 Coding Guidelines

### JavaScript/React Style Guide

- Use **functional components** with hooks
- Follow **React best practices**
- Use **meaningful variable names**
- Keep functions **small and focused**
- Add **comments** for complex logic

**Example:**
```javascript
// Good
const calculateChurnProbability = (customerData) => {
  const { tenure, monthlyCharges, supportTickets } = customerData;
  // Calculate churn probability logic
  return probability;
};

// Avoid
const calc = (d) => {
  // unclear function and parameter names
};
```

### File Organization

- One component per file
- Group related components in folders
- Use descriptive file names
- Keep files under 500 lines

### CSS/Tailwind Guidelines

- Use Tailwind utility classes
- Keep custom CSS minimal
- Use consistent spacing
- Follow mobile-first approach

### Code Formatting

- Use **2 spaces** for indentation
- Use **semicolons**
- Use **single quotes** for strings
- Maximum line length: **100 characters**

## 💬 Commit Messages

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting)
- **refactor**: Code refactoring
- **test**: Adding tests
- **chore**: Maintenance tasks

### Examples

```bash
feat(predictions): add batch prediction upload feature

Add ability to upload multiple customers for batch predictions.
Includes CSV parsing and results export.

Closes #123

---

fix(training): resolve model training timeout issue

Fixed timeout when training on large datasets by optimizing
the gradient descent algorithm.

---

docs(readme): update installation instructions

Added more detailed steps for Windows users.
```

### Best Practices

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests

## 🔄 Pull Request Process

### Before Submitting

1. **Test your changes** thoroughly
2. **Update documentation** if needed
3. **Add tests** for new features
4. **Run linter**: `npm run lint` (if configured)
5. **Ensure build works**: `npm run build`

### PR Template

When creating a pull request, include:

```markdown
## Description
[Brief description of changes]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
[How was this tested?]

## Screenshots
[If applicable]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Added tests
- [ ] All tests pass

## Related Issues
Closes #[issue number]
```

### Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, it will be merged
4. Your contribution will be recognized!

## 🏆 Recognition

All contributors will be:
- Listed in the README
- Credited in release notes
- Given a shoutout on social media (if desired)

## 📞 Questions?

Feel free to:
- Open an issue for questions
- Reach out to maintainers
- Join our community discussions

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)

---

Thank you for contributing! 🎉
