// src/components/common/SearchBar.jsx
import { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  
  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
      />
      <button type="submit" className="search-button">
        <i className="fa fa-search"></i>
      </button>
    </form>
  );
};

export default SearchBar;