const API_BASE_URL = 'http://localhost:5000/api';

// Get all questions
export const getQuestions = async (subject = '') => {
  try {
    const url = subject && subject !== 'All' 
      ? `${API_BASE_URL}/questions?subject=${subject}` 
      : `${API_BASE_URL}/questions`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch questions');
    return await response.json();
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

// Get single question by ID
export const getQuestionById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/questions/${id}`);
    if (!response.ok) throw new Error('Failed to fetch question');
    return await response.json();
  } catch (error) {
    console.error('Error fetching question:', error);
    throw error;
  }
};

// Create new question
export const createQuestion = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/questions`, {
      method: 'POST',
      body: formData, // FormData with image
    });
    if (!response.ok) throw new Error('Failed to create question');
    return await response.json();
  } catch (error) {
    console.error('Error creating question:', error);
    throw error;
  }
};

// Upvote a question
export const upvoteQuestion = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/questions/${id}/upvote`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Failed to upvote question');
    return await response.json();
  } catch (error) {
    console.error('Error upvoting question:', error);
    throw error;
  }
};

// Get all answers for a question
export const getAnswers = async (questionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/answers/${questionId}`);
    if (!response.ok) throw new Error('Failed to fetch answers');
    return await response.json();
  } catch (error) {
    console.error('Error fetching answers:', error);
    throw error;
  }
};

// Create new answer
export const createAnswer = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/answers`, {
      method: 'POST',
      body: formData, // FormData with image
    });
    if (!response.ok) throw new Error('Failed to create answer');
    return await response.json();
  } catch (error) {
    console.error('Error creating answer:', error);
    throw error;
  }
};

// Upvote an answer
export const upvoteAnswer = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/answers/${id}/upvote`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Failed to upvote answer');
    return await response.json();
  } catch (error) {
    console.error('Error upvoting answer:', error);
    throw error;
  }
};
