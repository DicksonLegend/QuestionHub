# Anonymous Doubt Solving Portal

A simple anonymous doubt-solving platform for students built with React, Node.js, Express, and MongoDB.

## 📋 Features

- 🎭 Anonymous question posting with optional image upload
- 💬 Anonymous answer submission with optional image upload
- ⬆️ Upvote system for questions and answers
- 📚 Subject/category filtering (Math, Physics, Chemistry, Computer Science, Other)
- 🔄 Questions sorted by most recent
- ⭐ Answers sorted by most upvotes

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite (Build tool)
- React Router DOM
- Fetch API for HTTP requests
- CSS3 for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Multer for file uploads
- CORS for cross-origin requests

## 📁 Project Structure

```
FullStack-Development-Project/
├── backend/
│   ├── models/
│   │   ├── Question.js
│   │   └── Answer.js
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── QuestionCard.jsx
    │   │   ├── AnswerCard.jsx
    │   │   └── CategoryFilter.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── AskQuestion.jsx
    │   │   └── QuestionDetail.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running locally
- npm or yarn package manager

### Installation

#### 1. Clone or navigate to the project directory

```bash
cd FullStack-Development-Project
```

#### 2. Setup Backend

```bash
cd backend
npm install
```

Configure your environment variables in `.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/doubt-solving-portal
```

Start the backend server:
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

#### 3. Setup Frontend

Open a new terminal window:

```bash
cd frontend
npm install
```

Start the React development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📡 API Endpoints

### Questions
- `GET /api/questions` - Get all questions (optional query: ?subject=Math)
- `GET /api/questions/:id` - Get single question by ID
- `POST /api/questions` - Create new question (multipart/form-data)
- `PATCH /api/questions/:id/upvote` - Upvote a question

### Answers
- `GET /api/answers/:questionId` - Get all answers for a question
- `POST /api/answers` - Create new answer (multipart/form-data)
- `PATCH /api/answers/:id/upvote` - Upvote an answer

## 💻 Usage

1. **Home Page**: View all questions, filter by subject
2. **Ask Question**: Click "Ask Question" button, fill in the form with title, description, subject, and optional image
3. **View Question**: Click on any question card to view details and answers
4. **Answer Question**: On the question detail page, submit your answer with optional image
5. **Upvote**: Click upvote buttons on questions and answers

## 🗄️ Database Schema

### Question Model
```javascript
{
  title: String (required),
  description: String (required),
  subject: String (required, enum),
  image: String (filename),
  upvotes: Number (default: 0),
  createdAt: Date (default: now)
}
```

### Answer Model
```javascript
{
  questionId: ObjectId (required, ref: Question),
  answerText: String (required),
  image: String (filename),
  upvotes: Number (default: 0),
  createdAt: Date (default: now)
}
```

## 📝 Notes

- All posts are completely anonymous (no user authentication)
- Images are stored locally in the `backend/uploads/` folder
- Maximum image upload size: 5MB
- Supported image formats: JPEG, JPG, PNG, GIF

## 🔧 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running locally
- Check if the connection string in `.env` is correct
- Default MongoDB port is 27017

### CORS Error
- Ensure backend is running on port 5000
- Check that CORS is properly configured in server.js

### Image Upload Not Working
- Check if `uploads/` folder exists in backend directory
- Verify file size is under 5MB
- Ensure file format is supported (jpg, jpeg, png, gif)

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Created as a simple full-stack project for learning purposes.
