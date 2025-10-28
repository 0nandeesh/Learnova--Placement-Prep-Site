<<<<<<< HEAD
# PrepNexus – Your Smart Placement Companion

A comprehensive full-stack web application for placement preparation with DSA, SQL, and OS materials. **No database required!**

## 🚀 Features

- **Modern UI**: React + Tailwind CSS with theme switching (Light/Dark/Blue)
- **DSA Preparation**: 37+ curated DSA questions with search and filtering
- **LinkedIn Problems**: LinkedIn DSA problems included
- **SQL Mastery**: SQL interview questions with examples
- **OS Notes**: Comprehensive operating system concepts
- **Contact System**: Backend API for contact form submissions
- **Responsive Design**: Mobile-first approach with smooth animations
- **No Database**: Uses static data - no setup required!

## 📁 Project Structure

```
PrepNexus/
├── frontend/                 # React + Tailwind CSS
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── context/         # Theme context
│   │   ├── utils/           # Utility functions
│   │   └── App.js           # Main app component
│   ├── public/              # Static assets
│   └── package.json
├── backend/                  # FastAPI (No Database!)
│   ├── app/
│   │   ├── routes/          # API routes
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── data.py          # Static data
│   │   └── main.py          # FastAPI app
│   └── requirements.txt
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)
- Axios (API calls)

### Backend
- FastAPI
- Static Data (No Database!)
- Pydantic (data validation)
- Python 3.9+

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Python 3.9+
- **No database required!**

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**That's it! No database setup needed!** 🎉

## 📱 Pages

- **Home**: Hero section with feature cards
- **DSA**: Searchable question bank with categories
- **SQL**: SQL interview questions and examples
- **OS**: Operating system notes and concepts
- **About**: Project information
- **Contact**: Contact form with backend integration

## 🎨 Theme System

- Light Theme (default)
- Dark Theme
- Blue Accent Theme
- Persistent theme selection

## 📊 Data Models

### DSA Question
```json
{
  "id": 1,
  "title": "Two Sum",
  "topic": "Arrays",
  "difficulty": "Easy",
  "source": "LeetCode",
  "link": "https://leetcode.com/problems/two-sum/",
  "category": "Arrays & Strings"
}
```

### SQL Material
```json
{
  "id": 1,
  "title": "Basic SELECT Queries",
  "category": "Basic SQL",
  "difficulty": "Easy",
  "content": "SQL examples...",
  "examples": ["example1", "example2"]
}
```

### OS Note
```json
{
  "id": 1,
  "title": "Process Management",
  "category": "Process Management",
  "content": "Detailed notes...",
  "links": ["resource1", "resource2"]
}
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `build`

### Backend (Railway/Render)
1. Connect GitHub repository
2. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
3. **No environment variables needed!**

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - see LICENSE file for details
=======
# Learnova--Placement-Prep-Site
A comprehensive full-stack web application for placement preparation with DSA, SQL, and OS materials.
>>>>>>> 76c8831eef06ca25b89958f31460d7e7c9944899
