import React from 'react';
import './CategoryFilter.css';

function CategoryFilter({ selectedSubject, onSubjectChange }) {
  const subjects = ['All', 'Operating System', 'Data Mining and Warehousing', 'Deep Learning', 'Bigdata Tools and Techniques', 'Theory of Computation', 'Fullstack Development'];

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
