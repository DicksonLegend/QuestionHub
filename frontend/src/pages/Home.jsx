import React, { useState, useEffect } from 'react';
import QuestionCard from '../components/QuestionCard';
import CategoryFilter from '../components/CategoryFilter';
import { getQuestions } from '../services/api';
import './Home.css';

function Home() {
  const [questions, setQuestions] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, [selectedSubject]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getQuestions(selectedSubject);
      setQuestions(data);
    } catch (err) {
      setError('Failed to load questions. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>All Questions</h1>
        <CategoryFilter 
          selectedSubject={selectedSubject} 
          onSubjectChange={setSelectedSubject} 
        />
      </div>

      {loading && <p className="loading">Loading questions...</p>}
      {error && <p className="error">{error}</p>}
      
      {!loading && !error && questions.length === 0 && (
        <p className="no-questions">No questions yet. Be the first to ask!</p>
      )}

      <div className="questions-list">
        {questions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </div>
  );
}

export default Home;
