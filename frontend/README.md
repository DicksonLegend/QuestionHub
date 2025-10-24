# Frontend - Doubt Solving Portal

React-based frontend for anonymous doubt-solving platform built with Vite.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Project Structure

- `components/` - Reusable UI components
  - `Navbar.jsx` - Navigation bar
  - `QuestionCard.jsx` - Question display card
  - `AnswerCard.jsx` - Answer display card
  - `CategoryFilter.jsx` - Subject filter dropdown

- `pages/` - Page components
  - `Home.jsx` - Main page with question list
  - `AskQuestion.jsx` - Form to post questions
  - `QuestionDetail.jsx` - Question detail with answers

- `services/` - API integration
  - `api.js` - All backend API calls using fetch

## Routes

- `/` - Home page (all questions)
- `/ask` - Ask new question
- `/question/:id` - Question detail page

## Features

- View all questions
- Filter questions by subject
- Post anonymous questions with optional images
- View question details with all answers
- Post anonymous answers with optional images
- Upvote questions and answers
- Responsive design

## API Integration

Backend URL: `http://localhost:5000/api`

All API calls are handled in `src/services/api.js` using the Fetch API.

## Dependencies

- `react` - UI library
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing
- `react-scripts` - Create React App scripts
