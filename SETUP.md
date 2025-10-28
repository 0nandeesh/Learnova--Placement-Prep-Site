# PrepNexus Setup Guide

This guide will help you set up PrepNexus locally for development. **No database required!**

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.9 or higher) - [Download](https://python.org/)
- **Git** - [Download](https://git-scm.com/)
- **No database needed!** 🎉

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/prepnexus.git
cd prepnexus
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the backend server
uvicorn app.main:app --reload
```

The backend will be available at `http://localhost:8000`

**No database setup needed!** The app uses static data. 🎉

### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
```

The frontend will be available at `http://localhost:3000`


**That's it! No database setup needed!** 🎉

## 🔧 Development Workflow

### Backend Development

```bash
# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install new dependencies
pip install package-name
pip freeze > requirements.txt

# Run tests
pytest

# Format code
black app/

# Lint code
flake8 app/
```

### Frontend Development

```bash
# Install new dependencies
npm install package-name

# Run tests
npm test

# Build for production
npm run build

# Format code
npm run format

# Lint code
npm run lint
```

## 📁 Project Structure

```
PrepNexus/
├── backend/                 # FastAPI backend (No Database!)
│   ├── app/
│   │   ├── routes/         # API routes
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── data.py         # Static data
│   │   └── main.py         # FastAPI app
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/        # React context
│   │   ├── utils/          # Utility functions
│   │   └── App.js          # Main app component
│   ├── public/             # Static assets
│   └── package.json        # Node dependencies
├── README.md               # Project documentation
├── DEPLOYMENT.md           # Deployment guide
└── SETUP.md               # This file
```

## 🛠️ Available Scripts

### Backend Scripts
```bash
# Start development server
uvicorn app.main:app --reload

# Start production server
uvicorn app.main:app --host 0.0.0.0 --port 8000

# Run tests
pytest

# Format code
black app/

# Lint code
flake8 app/
```

### Frontend Scripts
```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App
npm run eject
```

## 🔍 API Endpoints

### DSA Questions
- `GET /api/dsa/` - Get all DSA questions
- `GET /api/dsa/categories` - Get categories
- `GET /api/dsa/difficulties` - Get difficulties
- `POST /api/dsa/` - Create new question

### SQL Materials
- `GET /api/sql/` - Get all SQL materials
- `GET /api/sql/categories` - Get categories
- `GET /api/sql/difficulties` - Get difficulties
- `POST /api/sql/` - Create new material

### OS Notes
- `GET /api/os/` - Get all OS notes
- `GET /api/os/categories` - Get categories
- `POST /api/os/` - Create new note

### Contact
- `POST /api/contact/` - Submit contact form
- `GET /api/contact/` - Get all submissions (admin)

## 🎨 Theme System

PrepNexus supports three themes:

1. **Light Theme** (default)
2. **Dark Theme**
3. **Blue Accent Theme**

The theme is stored in localStorage and persists across sessions.

## 🧪 Testing

### Backend Testing
```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app

# Run specific test file
pytest tests/test_dsa.py
```

### Frontend Testing
```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- --testNamePattern="DSA"
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process using port 3000
   lsof -ti:3000 | xargs kill -9
   
   # Kill process using port 8000
   lsof -ti:8000 | xargs kill -9
   ```

2. **MongoDB Connection Issues**
   - Check if MongoDB is running
   - Verify connection string
   - Check firewall settings

3. **Node Modules Issues**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Delete node_modules and reinstall
   rm -rf node_modules
   npm install
   ```

4. **Python Virtual Environment Issues**
   ```bash
   # Deactivate and recreate
   deactivate
   rm -rf venv
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

### Debug Mode

```bash
# Backend debug mode
uvicorn app.main:app --reload --log-level debug

# Frontend debug mode
REACT_APP_DEBUG=true npm start
```

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://reactjs.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you need help with setup:

1. Check this guide first
2. Look at the troubleshooting section
3. Check existing issues on GitHub
4. Create a new issue with detailed information

Happy coding! 🚀
