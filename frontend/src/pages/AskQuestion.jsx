import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuestion } from '../services/api';
import './AskQuestion.css';

function AskQuestion() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: 'Operating System'
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.subject) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('subject', formData.subject);
      if (image) {
        submitData.append('image', image);
      }

      await createQuestion(submitData);
      navigate('/');
    } catch (err) {
      setError('Failed to post question. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ask-question-container">
      <h1>Ask a Question</h1>
      <p className="anonymous-notice">📝 Your question will be posted anonymously</p>
      
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="question-form">
        <div className="form-group">
          <label htmlFor="title">Question Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter your question title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide detailed description of your doubt"
            rows="6"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject *</label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          >
            <option value="Operating System">Operating System</option>
            <option value="Data Mining and Warehousing">Data Mining and Warehousing</option>
            <option value="Deep Learning">Deep Learning</option>
            <option value="Bigdata Tools and Techniques">Bigdata Tools and Techniques</option>
            <option value="Theory of Computation">Theory of Computation</option>
            <option value="Fullstack Development">Fullstack Development</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">Attach Image (Optional)</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
              <button 
                type="button" 
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                }}
                className="remove-image-btn"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Posting...' : 'Post Question'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AskQuestion;
