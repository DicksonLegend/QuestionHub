import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnswerCard from '../components/AnswerCard';
import { getQuestionById, getAnswers, upvoteQuestion, createAnswer, upvoteAnswer } from '../services/api';
import './QuestionDetail.css';

function QuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState('');
  const [answerImage, setAnswerImage] = useState(null);
  const [answerImagePreview, setAnswerImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [hasUpvotedQuestion, setHasUpvotedQuestion] = useState(false);
  const [upvotedAnswers, setUpvotedAnswers] = useState(new Set());
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    fetchQuestionAndAnswers();
    // Check if user has already upvoted this question
    const upvotedQuestions = JSON.parse(localStorage.getItem('upvotedQuestions') || '[]');
    setHasUpvotedQuestion(upvotedQuestions.includes(id));
    
    // Check which answers user has upvoted
    const upvotedAnswersData = JSON.parse(localStorage.getItem('upvotedAnswers') || '[]');
    setUpvotedAnswers(new Set(upvotedAnswersData));
  }, [id]);

  const fetchQuestionAndAnswers = async () => {
    try {
      setLoading(true);
      setError(null);
      const [questionData, answersData] = await Promise.all([
        getQuestionById(id),
        getAnswers(id)
      ]);
      setQuestion(questionData);
      setAnswers(answersData);
    } catch (err) {
      setError('Failed to load question details. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpvoteQuestion = async () => {
    // Check if already upvoted
    if (hasUpvotedQuestion) {
      alert('You have already upvoted this question!');
      return;
    }

    try {
      const updatedQuestion = await upvoteQuestion(id);
      setQuestion(updatedQuestion);
      setHasUpvotedQuestion(true);
      
      // Save to localStorage
      const upvotedQuestions = JSON.parse(localStorage.getItem('upvotedQuestions') || '[]');
      upvotedQuestions.push(id);
      localStorage.setItem('upvotedQuestions', JSON.stringify(upvotedQuestions));
    } catch (err) {
      console.error('Failed to upvote question:', err);
      alert('Failed to upvote. Please try again.');
    }
  };

  const handleUpvoteAnswer = async (answerId) => {
    // Check if already upvoted
    if (upvotedAnswers.has(answerId)) {
      alert('You have already upvoted this answer!');
      return;
    }

    try {
      const updatedAnswer = await upvoteAnswer(answerId);
      setAnswers(answers.map(ans => 
        ans._id === answerId ? updatedAnswer : ans
      ));
      
      // Update local state
      const newUpvotedAnswers = new Set(upvotedAnswers);
      newUpvotedAnswers.add(answerId);
      setUpvotedAnswers(newUpvotedAnswers);
      
      // Save to localStorage
      const upvotedAnswersArray = Array.from(newUpvotedAnswers);
      localStorage.setItem('upvotedAnswers', JSON.stringify(upvotedAnswersArray));
    } catch (err) {
      console.error('Failed to upvote answer:', err);
      alert('Failed to upvote. Please try again.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAnswerImage(file);
      setAnswerImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    
    if (!answerText.trim()) {
      alert('Please enter an answer');
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append('questionId', id);
      formData.append('answerText', answerText);
      if (answerImage) {
        formData.append('image', answerImage);
      }

      const newAnswer = await createAnswer(formData);
      setAnswers([newAnswer, ...answers]);
      setAnswerText('');
      setAnswerImage(null);
      setAnswerImagePreview(null);
    } catch (err) {
      alert('Failed to submit answer. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date) => {
    const questionDate = new Date(date);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return questionDate.toLocaleString('en-US', options);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!question) return <div className="error">Question not found</div>;

  return (
    <div className="question-detail-container">
      <button onClick={() => navigate('/')} className="back-btn">
        ← Back to Questions
      </button>

      <div className="question-detail">
        <div className="question-header">
          <span className="question-subject-badge">{question.subject}</span>
          <span className="question-date">{formatDate(question.createdAt)}</span>
        </div>
        
        <h1 className="question-title">{question.title}</h1>
        <p className="question-description">{question.description}</p>
        
        {question.image && (
          <>
            <div className="question-image-container" onClick={() => setShowImageModal(true)}>
              <img 
                src={`http://localhost:5000/uploads/${question.image}`} 
                alt="Question attachment" 
                className="question-image"
              />
              <div className="image-zoom-hint">🔍 Click to view full size</div>
            </div>
            
            {showImageModal && (
              <div className="image-modal" onClick={() => setShowImageModal(false)}>
                <div className="image-modal-content">
                  <button className="modal-close" onClick={() => setShowImageModal(false)}>
                    ✕
                  </button>
                  <img 
                    src={`http://localhost:5000/uploads/${question.image}`} 
                    alt="Question attachment full size" 
                    className="modal-image"
                  />
                  <p className="modal-hint">Click anywhere to close</p>
                </div>
              </div>
            )}
          </>
        )}

        <button 
          onClick={handleUpvoteQuestion} 
          className={`upvote-question-btn ${hasUpvotedQuestion ? 'upvoted' : ''}`}
          disabled={hasUpvotedQuestion}
        >
          ⬆️ {hasUpvotedQuestion ? 'Upvoted' : 'Upvote'} ({question.upvotes})
        </button>
      </div>

      <div className="answers-section">
        <h2>Answers ({answers.length})</h2>
        
        <div className="answer-form">
          <h3>Post Your Answer</h3>
          <p className="anonymous-notice">📝 Your answer will be posted anonymously</p>
          <form onSubmit={handleSubmitAnswer}>
            <textarea
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Write your answer here..."
              rows="4"
              required
            />
            
            <div className="form-group">
              <label htmlFor="answer-image">Attach Image (Optional)</label>
              <input
                type="file"
                id="answer-image"
                accept="image/*"
                onChange={handleImageChange}
              />
              {answerImagePreview && (
                <div className="image-preview">
                  <img src={answerImagePreview} alt="Preview" />
                  <button 
                    type="button" 
                    onClick={() => {
                      setAnswerImage(null);
                      setAnswerImagePreview(null);
                    }}
                    className="remove-image-btn"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            <button type="submit" disabled={submitting} className="submit-answer-btn">
              {submitting ? 'Submitting...' : 'Submit Answer'}
            </button>
          </form>
        </div>

        <div className="answers-list">
          {answers.length === 0 ? (
            <p className="no-answers">No answers yet. Be the first to answer!</p>
          ) : (
            answers.map((answer) => (
              <AnswerCard 
                key={answer._id} 
                answer={answer} 
                onUpvote={handleUpvoteAnswer}
                hasUpvoted={upvotedAnswers.has(answer._id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionDetail;
