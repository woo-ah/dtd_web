// src/pages/Door/ResultDisplay.js

import React from 'react';

const ResultDisplay = ({ result }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <p><strong>Door Type:</strong> {result.doorType}</p>
      <p><strong>Instructions:</strong> {result.instructions}</p>
    </div>
  );
};

export default ResultDisplay;
