import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { filter } from 'lodash';

const SearchComponent = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(data); // Initialize filteredData with the entire data array
  }, [data]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter data based on search term matching prs_status_name_or field
    const filtered = data.filter(item =>
      item.prs_status_name_or.toLowerCase().includes(term)
    );
   

    setFilteredData(filtered);
  };

  return (
    <div className="container mt-5">
      <form className="mb-3">
        <div className="form-group">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name..."
            className="form-control"
          />
        </div>
      </form>
      <ul className="list-group">
        {Array.isArray(filteredData) && filteredData.map((item, index) => (
          <li key={index} className="list-group-item">
            <div><strong>OR Name:</strong> {item.prs_status_name_or}</div>
            <div><strong>Amharic Name:</strong> {item.prs_status_name_am}</div>
            <div><strong>English Name:</strong> {item.prs_status_name_en}</div>
            <div><strong>Color Code:</strong> {item.prs_color_code}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
