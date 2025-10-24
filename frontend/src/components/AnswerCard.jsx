import React from 'react';
import './AnswerCard.css';

function AnswerCard({ answer, onUpvote }) {
  const formatDate = (date) => {
    const now = new Date();
    const answerDate = new Date(date);
    const diffInHours = Math.floor((now - answerDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return answerDate.toLocaleDateString();
  };

  return (
    <div className="answer-card">
      <div className="answer-header">
        <span className="answer-time">{formatDate(answer.createdAt)}</span>
      </div>
      <p className="answer-text">{answer.answerText}</p>
      {answer.image && (
        <div className="answer-image-container">
          <img 
            src={`http://localhost:5000/uploads/${answer.image}`} 
            alt="Answer attachment" 
            className="answer-image"
          />
        </div>
      )}
      <div className="answer-footer">
        <button 
          className="upvote-btn" 
          onClick={() => onUpvote(answer._id)}
        >
          ⬆️ Upvote ({answer.upvotes})
        </button>
      </div>
    </div>
  );
}

export default AnswerCard;
