import React from 'react';
import { FaSearch, FaMicrophone } from 'react-icons/fa';
import './SearchBar.css'; // CSS 파일 임포트

const SearchBar = ({ query, setQuery, handleVoiceInput, isListening, autocompleteRef }) => {
  return (
    <div className="search-bar-container">
      <FaSearch className="search-icon" />
      <input
        ref={autocompleteRef}
        type="text"
        placeholder="여기서 검색하세요..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-bar"
      />
      <button onClick={handleVoiceInput} className={`voice-input-button ${isListening ? 'listening' : ''}`}>
        <FaMicrophone />
      </button>
    </div>
  );
};

export default SearchBar;
