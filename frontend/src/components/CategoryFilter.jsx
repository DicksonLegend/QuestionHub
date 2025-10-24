import React from 'react';
import './CategoryFilter.css';

function CategoryFilter({ selectedSubject, onSubjectChange }) {
  const subjects = ['All', 'Math', 'Physics', 'Chemistry', 'Computer Science', 'Other'];

  return (
    <div className="category-filter">
      <label htmlFor="subject-select">Filter by Subject: </label>
      <select 
        id="subject-select"
        value={selectedSubject} 
        onChange={(e) => onSubjectChange(e.target.value)}
        className="subject-select"
      >
        {subjects.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
