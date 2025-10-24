import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuestionCard.css';

function QuestionCard({ question }) {
  const navigate = useNavigate();

  const formatDate = (date) => {
    const now = new Date();
    const questionDate = new Date(date);
    const diffInHours = Math.floor((now - questionDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return questionDate.toLocaleDateString();
  };

  return (
    <div className="question-card" onClick={() => navigate(`/question/${question._id}`)}>
      <div className="question-header">
        <span className="question-subject">{question.subject}</span>
        <span className="question-time">{formatDate(question.createdAt)}</span>
      </div>
      <h3 className="question-title">{question.title}</h3>
      <p className="question-description">
        {question.description.length > 150 
          ? question.description.substring(0, 150) + '...' 
          : question.description}
      </p>
      {question.image && (
        <div className="question-has-image">📎 Has image</div>
      )}
      <div className="question-footer">
        <span className="upvotes">⬆️ {question.upvotes} upvotes</span>
      </div>
    </div>
  );
}

export default QuestionCard;
