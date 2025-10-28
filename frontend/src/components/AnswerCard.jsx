import React, { useState } from 'react';
import './AnswerCard.css';

function AnswerCard({ answer, onUpvote, hasUpvoted }) {
  const [showImageModal, setShowImageModal] = useState(false);

  const formatDate = (date) => {
    const now = new Date();
    const answerDate = new Date(date);
    const diffInSeconds = Math.floor((now - answerDate) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
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
        <>
          <div className="answer-image-container" onClick={() => setShowImageModal(true)}>
            <img 
              src={`https://questionhub-backend-jjp2.onrender.com/uploads/${answer.image}`} 
              alt="Answer attachment" 
              className="answer-image"
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
                  src={`https://questionhub-backend-jjp2.onrender.com/uploads/${answer.image}`} 
                  alt="Answer attachment full size" 
                  className="modal-image"
                />
                <p className="modal-hint">Click anywhere to close</p>
              </div>
            </div>
          )}
        </>
      )}
      <div className="answer-footer">
        <button 
          className={`upvote-btn ${hasUpvoted ? 'upvoted' : ''}`}
          onClick={() => onUpvote(answer._id)}
          disabled={hasUpvoted}
        >
          ⬆️ {hasUpvoted ? 'Upvoted' : 'Upvote'} ({answer.upvotes})
        </button>
      </div>
    </div>
  );
}

export default AnswerCard;
