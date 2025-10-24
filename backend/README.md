# Backend - Doubt Solving Portal

Simple Express.js backend for anonymous doubt-solving platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/doubt-solving-portal
```

3. Make sure MongoDB is running locally

4. Start the server:
```bash
npm start
```

Or with auto-restart (development):
```bash
npm run dev
```

## Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Enable CORS
- `dotenv` - Environment variables
- `multer` - File upload handling

## API Routes

All routes are defined in `server.js`:

- `GET /` - API status check
- `GET /api/questions` - Get all questions
- `GET /api/questions/:id` - Get single question
- `POST /api/questions` - Create question (with image upload)
- `PATCH /api/questions/:id/upvote` - Upvote question
- `GET /api/answers/:questionId` - Get answers for a question
- `POST /api/answers` - Create answer (with image upload)
- `PATCH /api/answers/:id/upvote` - Upvote answer

## File Uploads

- Images are stored in `uploads/` folder
- Accessible via `/uploads/<filename>`
- Max size: 5MB
- Allowed formats: jpg, jpeg, png, gif

## Database Models

### Question
- title (String, required)
- description (String, required)
- subject (String, required, enum)
- image (String, optional)
- upvotes (Number, default: 0)
- createdAt (Date, auto)

### Answer
- questionId (ObjectId, required)
- answerText (String, required)
- image (String, optional)
- upvotes (Number, default: 0)
- createdAt (Date, auto)
