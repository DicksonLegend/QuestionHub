const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Import models
const Question = require('./models/Question');
const Answer = require('./models/Answer');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve uploaded images statically
app.use('/uploads', express.static(uploadsDir));

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));

// ==================== ROUTES ====================

// GET /api/questions - Get all questions
app.get('/api/questions', async (req, res) => {
  try {
    const { subject } = req.query;
    const filter = subject && subject !== 'All' ? { subject } : {};
    
    const questions = await Question.find(filter)
      .sort({ createdAt: -1 });
    
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Error fetching questions', error: error.message });
  }
});

// GET /api/questions/:id - Get single question
app.get('/api/questions/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    res.json(question);
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ message: 'Error fetching question', error: error.message });
  }
});

// POST /api/questions - Create question with optional image
app.post('/api/questions', upload.single('image'), async (req, res) => {
  try {
    const { title, description, subject } = req.body;
    
    if (!title || !description || !subject) {
      return res.status(400).json({ message: 'Title, description, and subject are required' });
    }
    
    const newQuestion = new Question({
      title,
      description,
      subject,
      image: req.file ? req.file.filename : null
    });
    
    const savedQuestion = await newQuestion.save();
    console.log('✅ Question created:', savedQuestion._id);
    
    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ message: 'Error creating question', error: error.message });
  }
});

// PATCH /api/questions/:id/upvote - Upvote question
app.patch('/api/questions/:id/upvote', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    question.upvotes += 1;
    await question.save();
    
    console.log('✅ Question upvoted:', question._id, 'Total upvotes:', question.upvotes);
    
    res.json(question);
  } catch (error) {
    console.error('Error upvoting question:', error);
    res.status(500).json({ message: 'Error upvoting question', error: error.message });
  }
});

// GET /api/answers/:questionId - Get all answers for a question
app.get('/api/answers/:questionId', async (req, res) => {
  try {
    const answers = await Answer.find({ questionId: req.params.questionId })
      .sort({ upvotes: -1, createdAt: -1 });
    
    res.json(answers);
  } catch (error) {
    console.error('Error fetching answers:', error);
    res.status(500).json({ message: 'Error fetching answers', error: error.message });
  }
});

// POST /api/answers - Create answer with optional image
app.post('/api/answers', upload.single('image'), async (req, res) => {
  try {
    const { questionId, answerText } = req.body;
    
    if (!questionId || !answerText) {
      return res.status(400).json({ message: 'Question ID and answer text are required' });
    }
    
    // Check if question exists
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    const newAnswer = new Answer({
      questionId,
      answerText,
      image: req.file ? req.file.filename : null
    });
    
    const savedAnswer = await newAnswer.save();
    console.log('✅ Answer created:', savedAnswer._id);
    
    res.status(201).json(savedAnswer);
  } catch (error) {
    console.error('Error creating answer:', error);
    res.status(500).json({ message: 'Error creating answer', error: error.message });
  }
});

// PATCH /api/answers/:id/upvote - Upvote answer
app.patch('/api/answers/:id/upvote', async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    
    answer.upvotes += 1;
    await answer.save();
    
    console.log('✅ Answer upvoted:', answer._id, 'Total upvotes:', answer.upvotes);
    
    res.json(answer);
  } catch (error) {
    console.error('Error upvoting answer:', error);
    res.status(500).json({ message: 'Error upvoting answer', error: error.message });
  }
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Doubt Solving Portal API is running!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
